import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar5 from "@/components/headers/Topbar5";
import Products11 from "@/components/products/Products11";

import Link from "next/link";
import React, { Suspense } from "react";

export default function Products() {
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
              <h3 className="heading text-center">Products</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>Products</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Products11 />
      </Suspense>
      <Footer1 />
    </>
  );
}
