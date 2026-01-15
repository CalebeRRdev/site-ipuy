// igreja-site/src/app/layout.tsx
import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/styles/components.css";

import ThemeProvider from "@/components/ThemeProvider";
import ReloadReveal from "@/components/ReloadReveal";
import ScrollRestore from "@/components/ScrollRestore";
import FaviconThemeSync from "@/components/FaviconThemeSync";

export const metadata: Metadata = {
  title: "Iglesia Presbiteriana del Uruguay - IPUY",
  description: "Iglesia Presbiteriana del Uruguay",
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