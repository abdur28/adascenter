import Navbar from "@/components/sections/Navbar";
import HeroScrollCanvas from "@/components/sections/HeroScrollCanvas";
import UTPSection from "@/components/sections/UTPSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import EquipmentSection from "@/components/sections/EquipmentSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import TechBackground from "@/components/background/TechBackground";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "ADAS ЦЕНТР",
  description:
    "Профессиональная мобильная калибровка ADAS: камеры, радары, LiDAR. Выезд по Москве и Московской области.",
  url: "https://adascenter.ru",
  telephone: "+79160999738",
  email: "adasrus@mail.ru",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 55.7558,
      longitude: 37.6173,
    },
    geoRadius: "100000",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Москва",
    addressRegion: "Московская область",
    addressCountry: "RU",
  },
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "₽₽",
  serviceType: [
    "Калибровка камер ADAS",
    "Калибровка радаров",
    "Калибровка LiDAR",
    "Диагностика ADAS",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <HeroScrollCanvas />
        <div className="grid" style={{ gridTemplate: "1fr / 1fr" }}>
          <TechBackground />
          <div className="relative" style={{ gridArea: "1/1", zIndex: 1 }}>
            <UTPSection />
            <PartnershipSection />
            <EquipmentSection />
            <FAQSection />
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
