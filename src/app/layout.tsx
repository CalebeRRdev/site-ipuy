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
    icon: "/images/favicon-light.png",
    shortcut: "/images/favicon-light.png",
    apple: "/images/favicon-light.png",
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