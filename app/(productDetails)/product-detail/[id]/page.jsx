import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Details from "@/components/productDetails/details/Details";
import ProductBreadcumb from "@/components/productDetails/ProductBreadcumb";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
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
      <ProductBreadcumb id={id} />
      <Details id={id} />
      {/* <Descriptions1 /> */}
      <RelatedProducts id={id} />
      <Footer1 hasPaddingBottom />
    </>
  );
}
