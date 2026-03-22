import type { Metadata } from "next";
import { Orbitron, Exo_2, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://adascenter.ru";
const SITE_NAME = "ADAS ЦЕНТР";
const SITE_DESCRIPTION =
  "Профессиональная мобильная калибровка ADAS: камеры, радары, датчики. Выезд в ваш автосервис по Москве и МО. Современное оборудование, официальный отчёт.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ADAS ЦЕНТР — Выездная калибровка систем помощи водителю",
    template: "%s | ADAS ЦЕНТР",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "ADAS калибровка",
    "калибровка камер",
    "калибровка радаров",
    "калибровка LiDAR",
    "выездная калибровка",
    "ADAS ЦЕНТР",
    "калибровка датчиков",
    "калибровка ADAS Москва",
    "диагностика ADAS",
    "замена лобового стекла калибровка",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "ADAS ЦЕНТР — Выездная калибровка систем помощи водителю",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "ADAS ЦЕНТР — Выездная калибровка систем помощи водителю",
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${orbitron.variable} ${exo2.variable} ${ibmPlexSans.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
