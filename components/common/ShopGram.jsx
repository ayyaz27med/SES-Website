"use client";
import { products2 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import safeImage from "@/utlis/safeImage";
import useInstagramPosts from "@/services/tanstack/queries/useInstagramPosts";

export default function ShopGram({ parentClass = "" }) {
  const { data, isLoading } = useInstagramPosts()
  const posts = data?.data || []

  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading wow fadeInUp">Shop Instagram</h3>
          <p className="subheading text-secondary wow fadeInUp">
            Elevate your wardrobe with fresh finds today!
          </p>
        </div>
        {!isLoading && (
          posts?.length > 0 ? (
            <Swiper
              dir="ltr"
              className="swiper tf-sw-shop-gallery"
              spaceBetween={10}
              breakpoints={{
                1200: { slidesPerView: 5 },
                768: { slidesPerView: 3 },
                0: { slidesPerView: 2 },
              }}
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
                el: ".spb222",
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              centeredSlides={posts?.length > 3 ? false : true}
              loop={posts?.length > 3 ? true : false}
            >
              {posts.map((item) => (
                <SwiperSlide key={item}>
                  <div
                    className="gallery-item hover-overlay hover-img wow fadeInUp"
                  >
                    <div className="img-style image-width">
                      <Image
                        className="lazyload img-hover"
                        data-src={item?.picture}
                        alt="image-gallery"
                        src={safeImage(item?.picture)}
                        width={250}
                        height={250}
                      />
                    </div>
                    <Link
                      href={item?.redirect_url || ''}
                      target="_blank"
                      className="box-icon hover-tooltip"
                    >
                      <span className="icon icon-eye" />
                      <span className="tooltip">View Post</span>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination-gallery sw-dots type-circle justify-content-center spb222"></div>
            </Swiper>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <h5>No Instagram Posts Available!</h5>
            </div>
          ))}
      </div>
    </section>
  );
}
