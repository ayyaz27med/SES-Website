import Footer1 from "@/components/footers/Footer1";
import React from "react";
import Link from "next/link";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import PrivacyPolicy from "@/components/otherPages/PrivacyPolicy";

export const metadata = {
  title:
    "Privacy Policy || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function PrivacyPolicyPage() {
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
              <h3 className="heading text-center">Privacy Policy</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <PrivacyPolicy />
      <Footer1 />
    </>
  );
}
