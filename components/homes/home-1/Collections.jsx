"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import safeImage from "@/utlis/safeImage";

export default function Collections({
  bestSelling
}) {

  return (
    <section className="flat-spacing-2 pb_0">
      <div className="container">
        <div className="heading-section-2 wow fadeInUp justify-content-center">
          <h3>Best Selling</h3>
        </div>
        <div
          className="flat-collection-circle wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <Swiper
            dir="ltr"
            slidesPerView={5}
            spaceBetween={20}
            breakpoints={{
              1200: { slidesPerView: 5, spaceBetween: 20 },
              1000: { slidesPerView: 4, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              480: { slidesPerView: 2, spaceBetween: 15 },
              0: { slidesPerView: 2, spaceBetween: 15 },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            pagination={{
              clickable: true,
              el: ".spd54",
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: ".snbp12",
              nextEl: ".snbn12",
            }}
            loop={true}
          >
            {bestSelling.map((collection, index) => (
              <SwiperSlide key={index}>
                <div className="collection-circle hover-img">
                  <div className="img-style">
                    <Image
                      className="lazyload"
                      data-src={collection.imgSrc}
                      alt={collection.alt}
                      src={safeImage(collection.imgSrc)}
                      width={363}
                      height={363}
                    />
                  </div>
                  <div className="collection-content text-center">
                    <div>
                      <Link href={collection.link} className="cls-title">
                        <h6 className="text">{collection.title}</h6>
                        <i className="icon icon-arrowUpRight" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="d-flex d-lg-none sw-pagination-collection sw-dots type-circle justify-content-center spd54" />
          <div className="nav-prev-collection d-none d-lg-flex nav-sw style-line nav-sw-left snbp12">
            <i className="icon icon-arrLeft" />
          </div>
          <div className="nav-next-collection d-none d-lg-flex nav-sw style-line nav-sw-right snbn12">
            <i className="icon icon-arrRight" />
          </div>
        </div>
      </div>
    </section>
  );
}
