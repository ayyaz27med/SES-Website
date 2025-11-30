import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar5 from "@/components/headers/Topbar5";
import Login from "@/components/otherPages/Login";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Login || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function LoginPage() {
  return (
    <>
      <Topbar5 bgColor="bg-main" />
      <Header1 />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Login / Register</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Login / Register</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Login />
      <Footer1 />
    </>
  );
}
