"use client";

import useGoogleReviews from "@/services/tanstack/queries/useGoogleReviews";
import safeImage from "@/utlis/safeImage";
import Image from "next/image";
import { useState } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FullScreenLoader from "../common/FullScreenLoader";

export default function Testimonials() {
  const { data, isLoading } = useGoogleReviews()
  const googleReviews = data?.data || []
  const [expandedStates, setExpandedStates] = useState(
    Array(googleReviews.length).fill(false)
  );

  if (isLoading) {
    return <FullScreenLoader image="/images/loaders/bubududu-panda.gif" />;
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Customer Review</h3>
        </div>
        <Swiper
          className="tf-sw-testimonial wow fadeInUp"
          data-wow-delay="0.1s"
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            768: { slidesPerView: 3 },
            576: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            el: ".spd81",
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}

          dir="ltr"
          centeredSlides={googleReviews?.length > 3 ? false : true}
          loop={googleReviews?.length > 3 ? true : false}
        >
          {googleReviews.map((item, index) => (
            <SwiperSlide key={item?.id}
              onClick={() => window.open(
                "https://share.google/eM0iD0eD2gnnaufg8",
                "_blank",
                "noopener,noreferrer"
              )}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="testimonial-item style-4"
                style={{ animationDelay: item.delay }}
              >
                <div className="content-top">
                  <div className="d-flex align-items-center gap-16">
                    <div className="avatar avt-40 round">
                      <Image
                        alt="avt"
                        src={safeImage(item?.picture)}
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="text-title">{item.user_name}</div>
                  </div>
                  <p className="text-secondary">
                    {expandedStates[index]
                      ? item.review
                      : item.review?.slice(0, 100) + "..."}
                    {item.review?.length > 100 && (
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
                  <div className="box-rate-author">
                    <div className="box-author">
                      <div className="text-title author">{item.author}</div>
                    </div>
                    <div className="list-star-default color-primary">
                      {Array(item?.star_review)
                        .fill(0)
                        .map((_, starIndex) => (
                          <i key={starIndex} className="icon icon-star" />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-pagination-testimonial sw-dots type-circle d-flex justify-content-center spd81" />
        </Swiper>
      </div>
    </section>
  );
}
