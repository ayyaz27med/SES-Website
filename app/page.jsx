import Footer1 from "@/components/footers/Footer1";
import Hero from "@/components/homes/home-1/Hero";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import HomeContent from "@/components/homes/home/HomeContent";

export const metadata = {
  title: "Home || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomePage() {
  return (
    <>
      <Topbar />
      <Header />
      <Hero />
      <HomeContent />
      <Footer1 />
    </>
  );
}
