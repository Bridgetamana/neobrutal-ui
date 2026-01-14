import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toast";
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "Neobrutal UI - A Neobrutalism-styled Component Library",
    template: "%s | Neobrutal UI",
  },
  description: "A collection of Neobrutalism-styled components built with Base UI and Tailwind CSS.",
  keywords: [
    "neobrutalism",
    "neobrutalism ui",
    "neobrutalism components",
    "brutalism ui",
    "tailwind components",
    "bold ui",
    "neobrutalism tailwind",
    "react neobrutalism",
    "react tailwind components",
    "shadcn components",
    "shadcn neobrutalism",
  ],
  authors: [{ name: "Bridget", url: "https://github.com/bridgetamana" }],
  creator: "Bridget",
  metadataBase: new URL("https://www.neobrutalui.live"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.neobrutalui.live",
    title: "Neobrutal UI",
    description: "A collection of Neobrutalism-styled components built with Base UI and Tailwind CSS.",
    siteName: "Neobrutal UI",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Neobrutal UI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neobrutal UI",
    description: "A collection of Neobrutalism-styled components built with Base UI and Tailwind CSS.",
    images: ["/opengraph-image.png"],
    creator: "@bridgetamana",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "BC_qnItrS5-84LtlJa_v3jwV0OpYALV72O-SV6Rq1zg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${publicSans.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
