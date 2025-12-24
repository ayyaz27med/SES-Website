import Footer1 from "@/components/footers/Footer1";
import Terms from "@/components/otherPages/Terms";
import React from "react";
import Link from "next/link";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";
import ReturnAndRefund from "@/components/otherPages/ReturnAndRefund";

export const metadata = {
  title:
    "Return & Refund Policy || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function ReturnAndRefundPolicy() {
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
              <h3 className="heading text-center">Return & Refund Policy</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Return & Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ReturnAndRefund />
      <Footer1 />
    </>
  );
}
