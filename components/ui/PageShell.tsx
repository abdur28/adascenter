import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}
