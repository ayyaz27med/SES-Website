import Footer1 from "@/components/footers/Footer1";
import StoreLocations3 from "@/components/otherPages/StoreLocations3";
import React from "react";
import Link from "next/link";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import ContactTab from "@/components/contacts/ContactTab";
export const metadata = {
  title: "Countact Us || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function ContactPage2() {
  return (
    <>
      <Topbar />
      <Header />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/banner/3-min.png)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Contact Us</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <StoreLocations3 />
      <ContactTab />
      <Footer1 />
    </>
  );
}
