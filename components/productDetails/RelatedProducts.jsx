"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { products } from "@/data/products";
import ProductCard1 from "../productCards/ProductCard1";
export default function RelatedProducts() {
  return (
    <section className="flat-spacing">
      <div className="container flat-animate-tab">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Related Products</h3>
        </div>
        <div>
          <Swiper
            className="swiper tf-sw-latest"
            dir="ltr"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 15 },

              768: { slidesPerView: 3, spaceBetween: 30 },
              1200: { slidesPerView: 4, spaceBetween: 30 },
            }}
            modules={[Pagination]}
            pagination={{
              clickable: true,
              el: ".spd4",
            }}
          >
            {products.slice(0, 6).map((product, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <ProductCard1 product={product} />
              </SwiperSlide>
            ))}

            <div className="sw-pagination-latest spd4  sw-dots type-circle justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
