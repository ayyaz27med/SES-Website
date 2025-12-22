import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import ProductDetailsContent from "@/components/products/ProductDetailsContent";
import React from "react";

export const metadata = {
  title:
    "Product Detail || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  return (
    <>
      <Topbar />
      <Header />
      <ProductDetailsContent id={id} />
      <Footer1 hasPaddingBottom />
    </>
  );
}
