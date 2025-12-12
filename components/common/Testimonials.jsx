"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialsWithProduct9 } from "@/data/products";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import safeImage from "@/utlis/safeImage";
import useGoogleReviews from "@/services/tanstack/queries/useGoogleReviews";

export default function Testimonials({ parentClass = "flat-spacing" }) {
  const { data } = useGoogleReviews()
  const googleReviews = data?.data || []
  const [expandedStates, setExpandedStates] = React.useState(
    Array(testimonialsWithProduct9.length).fill(false)
  );
  return (
    <section className={parentClass}>
      <div className="container">
        <div className="heading-section text-center">
          <h3 className="heading wow fadeInUp">Customer Say!</h3>
          <p className="subheading wow fadeInUp">
            Our customers adore our products, and we constantly aim to delight
            them.
          </p>
        </div>
        <div className="swiper tf-sw-testimonial">
          {googleReviews?.length > 0 ? (
            <Swiper
              breakpoints={{
                // Small devices (mobile)
                0: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                  pagination: { clickable: true },
                },
                // Medium devices (tablet)
                768: {
                  spaceBetween: 30,
                  slidesPerView: 3,
                  pagination: { clickable: true },
                },
                // Large devices (desktop)
                1024: {
                  spaceBetween: 30,
                  slidesPerView: 4,
                  pagination: { clickable: true },
                },
              }}
              modules={[Pagination, Autoplay]}
              pagination={{
                clickable: true,
                el: ".spd7",
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              dir="ltr"
              loop={true}
            >
              {googleReviews.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="testimonial-item hover-img">
                    <div className="content">
                      <div className="content-top">
                        <div className="list-star-default">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="icon icon-star" />
                          ))}
                        </div>
                        <p className="text-secondary">
                          {expandedStates[index]
                            ? testimonial.quote
                            : testimonial.quote.slice(0, 100) + "..."}
                          {testimonial.quote.length > 100 && (
                            <span
                              style={{ cursor: "pointer", color: "#3DAB25", marginLeft: 4 }}
                              className="small"
                              onClick={() =>
                                setExpandedStates(prev => {
                                  const copy = [...prev];
                                  copy[index] = !copy[index];
                                  return copy;
                                })
                              }
                            >
                              {expandedStates[index] ? "View Less" : "View More"}
                            </span>
                          )}
                        </p>
                        <div className="box-author">
                          <div className="text-title author">
                            {testimonial.author}
                          </div>
                          <svg
                            className="icon"
                            width={20}
                            height={21}
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0)">
                              <path
                                d="M6.875 11.6255L8.75 13.5005L13.125 9.12549"
                                stroke="#3DAB25"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 18.5005C14.1421 18.5005 17.5 15.1426 17.5 11.0005C17.5 6.85835 14.1421 3.50049 10 3.50049C5.85786 3.50049 2.5 6.85835 2.5 11.0005C2.5 15.1426 5.85786 18.5005 10 18.5005Z"
                                stroke="#3DAB25"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0">
                                <rect
                                  width={20}
                                  height={20}
                                  fill="white"
                                  transform="translate(0 0.684082)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                      <div className="box-avt">
                        <div className="avatar avt-60 round">
                          <Image
                            alt="avt"
                            src={safeImage(testimonial.avatar)}
                            width={90}
                            height={91}
                          />
                        </div>
                        <div className="box-price">
                          <p className="text-title text-line-clamp-1">
                            {testimonial.title}
                          </p>
                          <div className="text-button price">
                            {formatWithCurrency(testimonial.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd7" />
            </Swiper>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <h5>No Google Reviews Available!</h5>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
