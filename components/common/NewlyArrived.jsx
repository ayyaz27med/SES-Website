"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { newlyArrivedProducts } from "@/data/products";
import React from "react";
export default function NewlyArrived({ parentClass = "flat-spacing-3" }) {

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Newly Arrived</h3>
        </div>
        <div
          className="tab-pane active show tabFilter filtered"
        >
          <div className="tf-grid-layout tf-col-2 lg-col-3 xl-col-3">
            {newlyArrivedProducts.slice(0, 6).map((product, i) => (
              <ProductCard1 key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
