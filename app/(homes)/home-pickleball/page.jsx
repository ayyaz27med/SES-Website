import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Banner from "@/components/homes/home-pickleball/Banner";
import Blogs from "@/components/homes/home-pickleball/Blogs";
import Brands from "@/components/homes/home-pickleball/Brands";
import Features from "@/components/homes/home-pickleball/Features";
import Gallery from "@/components/homes/home-pickleball/Gallery";
import Hero from "@/components/homes/home-pickleball/Hero";
import Products from "@/components/homes/home-pickleball/Products";
import Products2 from "@/components/homes/home-pickleball/Products2";
import Testimonials from "@/components/homes/home-pickleball/Testimonials";
import React from "react";

export const metadata = {
  title:
    "Home Pickleball || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};
export default function page() {
  return (
    <>
      <Topbar />
      <Header />
      <Hero />
      <Products />
      <Banner />
      <Features />
      <Products2 />
      <Testimonials />
      <Blogs />
      <Brands />
      <Gallery />
      <Footer1 dark />
    </>
  );
}
