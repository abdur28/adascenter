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

export const metadata: Metadata = {
  title: "ADAS ЦЕНТР — Выездная калибровка систем помощи водителю",
  description:
    "Профессиональная мобильная калибровка ADAS: камеры, радары, датчики. Выезд в ваш автосервис. Работаем с современным оборудованием, выдаём официальный отчёт.",
  keywords: [
    "ADAS калибровка",
    "калибровка камер",
    "калибровка радаров",
    "выездная калибровка",
    "ADAS ЦЕНТР",
    "калибровка датчиков",
  ],
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
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
