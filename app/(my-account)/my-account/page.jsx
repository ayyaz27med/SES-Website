import React from "react";
import Footer1 from "@/components/footers/Footer1";
import Link from "next/link";
import MyAccountInfo from "@/components/my-account/MyAccount";
import Topbar from "@/components/headers/Topbar";
import Header from "@/components/headers/Header";

export const metadata = {
  title: "My Account || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function MyAccountPage() {
  return (
    <>
      <Topbar />
      <Header />
      <>
        {/* page-title */}
        <div
          className="page-title"
          style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
        >
          <div className="container-full">
            <div className="row">
              <div className="col-12">
                <h3 className="heading text-center">My Account</h3>
                <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                  <li>
                    <Link className="link" href={`/`}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <i className="icon-arrRight" />
                  </li>
                  <li>My Account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* /page-title */}
        <div className="btn-sidebar-account">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-squares-four" />
          </button>
        </div>
      </>

      <section className="flat-spacing">
        <div className="container">
          <MyAccountInfo />
        </div>
      </section>
      <Footer1 />
    </>
  );
}
