import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Wishlist from "@/components/otherPages/Wishlist";
import Link from "next/link";
import React from "react";

export default function WishListPage() {
  return (
    <>
      <Topbar />
      <Header />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/banner/3-min.png)" }}
      >
        <div className="container">
          <h3 className="heading text-center">Your Wishlist</h3>
          <ul className="breadcrumbs d-flex align-items-center justify-content-center">
            <li>
              <Link className="link" href={`/`}>
                Home
              </Link>
            </li>
            <li>
              <i className="icon-arrRight" />
            </li>
            <li>Wishlist</li>
          </ul>
        </div>
      </div>

      <Wishlist />

      <Footer1 />
    </>
  );
}
