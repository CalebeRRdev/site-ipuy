"use client";

import "./Location.module.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "next-themes";

declare global {
  interface Window {
    google?: any;
    __gmapsInit?: () => void;
  }
}

function loadGoogleMaps(apiKey: string) {
  if (typeof window !== "undefined" && window.google?.maps) return Promise.resolve();

  const existing = document.getElementById("google-maps-js");
  if (existing) {
    return new Promise<void>((resolve, reject) => {
      const t = window.setInterval(() => {
        if (window.google?.maps) {
          window.clearInterval(t);
          resolve();
        }
      }, 50);

      window.setTimeout(() => {
        window.clearInterval(t);
        reject(new Error("Google Maps load timeout"));
      }, 15000);
    });
  }

  return new Promise<void>((resolve, reject) => {
    window.__gmapsInit = () => resolve();

    const s = document.createElement("script");
    s.id = "google-maps-js";
    s.async = true;
    s.defer = true;
    s.src =
      "https://maps.googleapis.com/maps/api/js" +
      `?key=${encodeURIComponent(apiKey)}` +
      `&v=weekly&libraries=marker&callback=__gmapsInit`;

    s.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(s);
  });
}

export default function Location() {
  const { resolvedTheme } = useTheme();
  const mapElRef = useRef<HTMLDivElement | null>(null);

  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const currentMapIdRef = useRef<string>("");
  const currentThemeRef = useRef<"light" | "dark" | "">("");

  const [mapError, setMapError] = useState("");

  const markerImg = "/images/church-marker-2.png";

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const mapIdLight = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID_LIGHT ?? "";
  const mapIdDark = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID_DARK ?? "";
  const mapIdSingle = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "";

  const churches = useMemo(
    () => [
      {
        key: "montevideo",
        name: "Iglesia Presbiteriana de Montevideo",
        pos: { lat: -34.87879890160066, lng: -56.19938477542441 },
      },
      {
        key: "mercedes",
        name: "Iglesia Presbiteriana de Mercedes",
        pos: { lat: -33.248037707815136, lng: -58.025353336207736 },
      },
      {
        key: "las-piedras",
        name: "Iglesia Presbiteriana de Las Piedras",
        pos: { lat: -34.73310090092812, lng: -56.22479932516326 },
      },
      {
        key: "costa",
        name: "Iglesia Presbiteriana de La Costa",
        pos: { lat: -34.807702662703065, lng: -55.94431866074547 },
      },
    ],
    []
  );

  const desired = useMemo(() => {
    const theme: "light" | "dark" = resolvedTheme === "dark" ? "dark" : "light";

    const byTheme =
      theme === "dark" ? (mapIdDark || mapIdLight) : (mapIdLight || mapIdDark);

    const mapId = byTheme || mapIdSingle || "";

    return {
      theme,
      isDark: theme === "dark",
      mapId,
      usingSingleMapId: !!mapIdSingle && !mapIdLight && !mapIdDark,
    };
  }, [resolvedTheme, mapIdLight, mapIdDark, mapIdSingle]);

  function clearMap() {
    for (const m of markersRef.current) {
      try {
        m.map = null;
      } catch {}
    }
    markersRef.current = [];

    mapRef.current = null;
    currentMapIdRef.current = "";
    currentThemeRef.current = "";

    if (mapElRef.current) mapElRef.current.innerHTML = "";
  }

  useEffect(() => {
    let cancelled = false;

    async function build() {
      setMapError("");

      // evita inicializar antes do theme resolver (next-themes)
      if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;

      if (!apiKey) {
        setMapError("Falta NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no .env.local");
        return;
      }

      const el = mapElRef.current;
      if (!el) return;

      try {
        await loadGoogleMaps(apiKey);
        if (cancelled) return;

        const google = window.google;
        if (!google?.maps) throw new Error("Google Maps no disponible");

        if (!desired.mapId) {
          setMapError("Falta Map ID (NEXT_PUBLIC_GOOGLE_MAP_ID_*).");
          return;
        }

        // ✅ AQUI está o fix:
        // Recria o mapa quando:
        // - mapId muda (light/dark com IDs diferentes), OU
        // - o tema muda (mesmo mapId), porque o colorScheme nem sempre atualiza ao vivo.
        const needRecreate =
          !mapRef.current ||
          currentMapIdRef.current !== desired.mapId ||
          currentThemeRef.current !== desired.theme;

        if (needRecreate) {
          clearMap();
          if (cancelled) return;

          const map = new google.maps.Map(el, {
            center: { lat: -32.8, lng: -56.0 },
            zoom: 6,
            mapId: desired.mapId,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: "cooperative",
            ...(google.maps?.ColorScheme
              ? {
                  colorScheme: desired.isDark
                    ? google.maps.ColorScheme.DARK
                    : google.maps.ColorScheme.LIGHT,
                }
              : {}),
          });

          mapRef.current = map;
          currentMapIdRef.current = desired.mapId;
          currentThemeRef.current = desired.theme;

          const bounds = new google.maps.LatLngBounds();

          function makeMarkerContent(label: string) {
            const root = document.createElement("div");
            root.className = "gmarker-root";

            const img = document.createElement("img");
            img.src = markerImg;
            img.alt = label;
            img.className = "gmarker-img";
            img.decoding = "async";
            img.loading = "lazy";

            const tag = document.createElement("div");
            tag.className = "gmarker-label";
            tag.textContent = label;

            root.appendChild(img);
            root.appendChild(tag);
            return root;
          }

          churches.forEach((c) => {
            bounds.extend(c.pos);

            const marker = new google.maps.marker.AdvancedMarkerElement({
              map,
              position: c.pos,
              content: makeMarkerContent(c.name),
              title: c.name,
            });

            marker.addListener("gmp-click", () => {
              const url = `https://www.google.com/maps/search/?api=1&query=${c.pos.lat},${c.pos.lng}`;
              window.open(url, "_blank", "noopener,noreferrer");
            });

            markersRef.current.push(marker);
          });

          const isMobile = window.matchMedia("(max-width: 768px)").matches;

          const padding = isMobile
           ? { top: 60, right: 60, bottom: 90, left: 60 }   // mobile
           : { top: 70, right: 70, bottom: 70, left: 70 };  // desktop

          map.fitBounds(bounds, { padding });

          google.maps.event.addListenerOnce(map, "idle", () => {
            const z = map.getZoom?.();
            if (typeof z === "number" && z > 12) map.setZoom(12);
          
            // mobile: não mexe
            if (isMobile) return;
          
            // desktop: pan proporcional ao container (bem mais estável)
            const w = el.clientWidth || 0;
            const dx = Math.round(Math.min(140, Math.max(60, w * 0.12))); // 12% da largura (clamp 60–140)
            map.panBy(dx, 0);
          });

          return;
        }

        // Se não recriar, tenta reforçar o scheme (quando suportado)
        const map = mapRef.current;
        if (map && google.maps?.ColorScheme) {
          map.setOptions({
            colorScheme: desired.isDark
              ? google.maps.ColorScheme.DARK
              : google.maps.ColorScheme.LIGHT,
          });
        }
      } catch (e: any) {
        setMapError(e?.message || "Error cargando el mapa");
      }
    }

    build();

    return () => {
      cancelled = true;
    };
  }, [apiKey, churches, desired.mapId, desired.theme, desired.isDark, resolvedTheme]);

  useEffect(() => {
    return () => {
      clearMap();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fallbackUrl = "https://www.google.com/maps/search/?api=1&query=Uruguay";

  return (
    <section id="ubicacion" className="section">
      <div className="container">
        <header className="section-header">
          <p className="kicker">UBICACIÓN</p>
          <h2 className="section-title">Nuestras iglesias</h2>
          <p className="section-lead">Encontrá las iglesias presbiterianas en Uruguay.</p>
        </header>

        <div className="map-wrap">
          <div className="map-aspect map-aspect--location">
            <div className="map-canvas" ref={mapElRef} />

            {mapError ? (
              <div className="map-fallback" role="status">
                <div className="map-fallback-title">Mapa no disponible</div>
                <div className="map-fallback-text">{mapError}</div>
                <a className="btn btn-googlemaps" href={fallbackUrl} target="_blank" rel="noreferrer">
                  Abrir en Google Maps
                </a>
              </div>
            ) : null}
          </div>

          <div className="map-footer">
            <div className="map-meta">
              <div className="map-meta-title">Tip</div>
              <div className="map-meta-text">
                Podés tocar un marcador para abrir esa ubicación en Google Maps.
              </div>
            </div>

            <div className="map-actions">
              <a href={fallbackUrl} target="_blank" rel="noreferrer" className="btn btn-googlemaps">
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}