import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Collections from "@/components/homes/home-1/Collections";
import Features from "@/components/common/Features";
import Hero from "@/components/homes/home-1/Hero";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Topbar5 from "@/components/headers/Topbar5";
import Categories from "@/components/homes/fashion-luxeLiving/Categories";
import NewlyArrived from "@/components/common/NewlyArrived";

export const metadata = {
  title: "Home || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function HomePage() {
  return (
    <>
      <Topbar5 />
      <Header1 />
      <Hero />
      <Categories/>
      <Collections />
      <NewlyArrived />
      {/* <BannerCollection /> */}
      {/* <BannerCountdown /> */}
      <Testimonials />
      {/* <Blogs /> */}
      <ShopGram />
      <Features />
      <Footer1 />
    </>
  );
}
