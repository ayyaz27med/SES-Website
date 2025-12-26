import Footer1 from "@/components/footers/Footer1";
import React from "react";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import ComplaintForm from "@/components/forms/ComplaintForm";

export const metadata = {
  title: "Countact Us || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default async function InstoreComplaint({ params }) {
  const { id } = await params;

  return (
    <>
      <Topbar />
      <Header />
      <div className="flat-spacing-5">
        <h3 className="heading text-center mb_40">Report Instore Complaint</h3>
        <ComplaintForm />
      </div>
      <Footer1 />
    </>
  );
}
