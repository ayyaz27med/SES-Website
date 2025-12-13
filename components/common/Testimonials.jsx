"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
import { testimonialsWithProduct9 } from "@/data/products";
import safeImage from "@/utlis/safeImage";
import useGoogleReviews from "@/services/tanstack/queries/useGoogleReviews";
import { useRouter } from "next/navigation";

export default function Testimonials({ parentClass = "flat-spacing" }) {
  const router = useRouter()
  const { data, isLoading } = useGoogleReviews()
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
          {!isLoading && (
            googleReviews?.length > 0 ? (
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
                centeredSlides={googleReviews?.length > 3 ? false : true}
                loop={googleReviews?.length > 3 ? true : false}
              >
                {googleReviews.map((testimonial, index) => (
                  <SwiperSlide key={index} onClick={() => window.open(
                    "https://share.google/eM0iD0eD2gnnaufg8",
                    "_blank",
                    "noopener,noreferrer"
                  )
                  } style={{ cursor: 'pointer' }}>
                    <div className="testimonial-item hover-img">
                      <div className="content">
                        <div className="content-top">
                          <div className="list-star-default">
                            {[...Array(testimonial?.star_review)].map((_, i) => (
                              <i key={i} className="icon icon-star" />
                            ))}
                          </div>
                          <p className="text-secondary">
                            {expandedStates[index]
                              ? testimonial?.review
                              : testimonial?.review?.slice(0, 100) + "..."}
                            {testimonial?.review?.length > 100 && (
                              <span
                                style={{ cursor: "pointer", color: "#3DAB25", marginLeft: 4 }}
                                className="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedStates(prev => {
                                    const copy = [...prev];
                                    copy[index] = !copy[index];
                                    return copy;
                                  })
                                }}
                              >
                                {expandedStates[index] ? "View Less" : "View More"}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="box-avt">
                          <div className="avatar avt-60 round">
                            <Image
                              alt="avt"
                              src={safeImage(testimonial?.picture)}
                              width={90}
                              height={91}
                            />
                          </div>
                          <div className="box-price">
                            <p className="text-title text-line-clamp-1">
                              {testimonial?.user_name}
                            </p>
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
                <h5>No Reviews Available</h5>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
