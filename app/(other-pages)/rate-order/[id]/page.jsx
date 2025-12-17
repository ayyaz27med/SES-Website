import Footer1 from "@/components/footers/Footer1";
import React from "react";
import Link from "next/link";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import RateOrderForm from "@/components/forms/RateOrderForm";
export const metadata = {
  title: "Countact Us || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default async function RateOrder({ params }) {
  const { id } = await params;

  return (
    <>
      <Topbar />
      <Header />
      <div className="flat-spacing-5">
        <h3 className="heading text-center">Rate Your Order Experience</h3>
        <RateOrderForm id={id} />
      </div>
      <Footer1 />
    </>
  );
}
