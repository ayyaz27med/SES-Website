import Brands from "@/components/common/Brands";
import Features2 from "@/components/common/Features2";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";
import About from "@/components/otherPages/About";
import Team from "@/components/otherPages/Team";
import Testimonials from "@/components/otherPages/Testimonials";
import React from "react";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";

export const metadata = {
  title: "About Us || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function AboutUsPage() {
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
              <h3 className="heading text-center">About Us</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <About />
      <Features2 parentClass="flat-spacing line-bottom-container" />
      {/* <Team /> */}
      {/* <Brands parentClass="flat-spacing-5 bg-surface" /> */}
      <Testimonials />
      <Footer1 />
    </>
  );
}
