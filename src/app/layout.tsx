// igreja-site/src/app/layout.tsx
import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/styles/components.css";

import ThemeProvider from "@/components/ThemeProvider";
import ReloadReveal from "@/components/ReloadReveal";
import ScrollRestore from "@/components/ScrollRestore";
import FaviconThemeSync from "@/components/FaviconThemeSync";

export const metadata: Metadata = {
  title: "IPUY",
  description: "Iglesia Presbiteriana del Uruguay",
  icons: {
    icon: [
      { url: "/images/favicon-light.png", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-dark.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: [
      { url: "/images/favicon-light.png", type: "image/png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-dark.png", type: "image/png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/images/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/images/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <FaviconThemeSync />
          <ReloadReveal />
          <ScrollRestore />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}