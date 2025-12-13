import Footer1 from "@/components/footers/Footer1";
import Collections from "@/components/homes/home-1/Collections";
import Features from "@/components/common/Features";
import Hero from "@/components/homes/home-1/Hero";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Categories from "@/components/homes/fashion-luxeLiving/Categories";
import NewlyArrived from "@/components/common/NewlyArrived";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";

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
      <Categories/>
      <Collections />
      <NewlyArrived />
      <Testimonials />
      <ShopGram />
      <Features />
      <Footer1 />
    </>
  );
}
