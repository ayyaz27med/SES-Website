import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import SearchProducts from "@/components/products/SearchProducts";
import React from "react";

export default function SearchResultPage() {
  return (
    <>
      <Topbar />
      <Header />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Search</h3>
            </div>
          </div>
        </div>
      </div>
      <SearchProducts />

      <Footer1 />
    </>
  );
}
