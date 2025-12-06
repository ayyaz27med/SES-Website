import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Products1 from "@/components/products/Products1";
import Link from "next/link";
import React from "react";

export default function ShopBreadcumbBackgroundPage() {
  return (
    <>
      <Topbar />
      <Header />
      <div className="page-title">
        <div className="container">
          <h3 className="heading text-center">Women</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" href={`/`}>
                Homepage
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
              Women
            </li>
          </ul>
        </div>
      </div>

      <Products1 />
      <Footer1 />
    </>
  );
}
