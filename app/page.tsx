import Navbar from "@/components/sections/Navbar";
import HeroScrollCanvas from "@/components/sections/HeroScrollCanvas";
import UTPSection from "@/components/sections/UTPSection";
import PartnershipSection from "@/components/sections/PartnershipSection";
import EquipmentSection from "@/components/sections/EquipmentSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import TechBackground from "@/components/background/TechBackground";

export default function Home() {
  return (
    <>
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
