// igreja-site/src/app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resources from "@/components/Resources"; // ✅ IMPORTA
import Schedule from "@/components/Schedule";
import LatestLive from "@/components/LatestLive";
import Location from "@/components/Location";
import Contact from "@/components/Contact"; // ✅ IMPORTA
import Footer from "@/components/Footer";
import ThemeToggleFab from "@/components/ThemeToggleFab";

export default function Page() {
  return (
    <>
      <Navbar />

      <div className="page-reveal">
        <main className="page-main">
          <Hero />
          <About />

          {/* ✅ NOVO: seção Materiales */}
          <Resources />

          <LatestLive />
          <Schedule />
          <Location />
          <Contact /> {/* ✅ RENDERIZA (tem que existir no DOM pro scroll funcionar) */}
        </main>

        <Footer />
      </div>

      <ThemeToggleFab />
    </>
  );
}