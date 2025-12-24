import Footer1 from "@/components/footers/Footer1";
import React from "react";
import Link from "next/link";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import PrivacyPolicy from "@/components/otherPages/PrivacyPolicy";
import TermsAndConditions from "@/components/otherPages/TermsAndConditions";

export const metadata = {
  title:
    "Terms and Conditions || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Topbar />
      <Header />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/banner/2-min.png)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Terms & Conditions</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <TermsAndConditions />
      <Footer1 />
    </>
  );
}
