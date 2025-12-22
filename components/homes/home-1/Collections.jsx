"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import safeImage from "@/utlis/safeImage";
import useCategories from "@/services/tanstack/queries/useCategories";
import useSubCategories from "@/services/tanstack/queries/useSubCategories";
import { useMemo } from "react";

export default function Collections() {
  const { data: categoriesData } = useCategories({
    isServerSidePagination: true,
    "order[0][0]": "name",
    "order[0][1]": "ASC",
  });
  const categories = categoriesData?.data || []
  const skincareCategory = categories.find((category) => category.name === "Skincare")
  const bodycareCategory = categories.find((category) => category.name === "Bodycare")

  const { data: skincareSubCategoriesData } = useSubCategories({
    category_id: skincareCategory?.id,
    type: 'sub_category',
  });
  const { data: skincareConcernsData } = useSubCategories({
    category_id: skincareCategory?.id,
    type: 'concerns',
  });
  const { data: skincareIngredientsData } = useSubCategories({
    category_id: skincareCategory?.id,
    type: 'ingredients',
  });
  const { data: bodycareSubCategoriesData } = useSubCategories({
    category_id: bodycareCategory?.id,
    type: 'sub_category',
  });
  const { data: bodycareConcernsData } = useSubCategories({
    category_id: bodycareCategory?.id,
    type: 'concerns',
  });
  const { data: bodycareIngredientsData } = useSubCategories({
    category_id: bodycareCategory?.id,
    type: 'ingredients',
  });

  const skincareSubCategories = skincareSubCategoriesData?.sub_category ?? [];
  const bodycareSubCategories = bodycareSubCategoriesData?.sub_category ?? [];
  const skincareConcerns = skincareConcernsData?.concerns ?? [];
  const bodycareConcerns = bodycareConcernsData?.concerns ?? [];
  const skincareIngredients = skincareIngredientsData?.ingredients ?? [];
  const bodycareIngredients = bodycareIngredientsData?.ingredients ?? [];

  const getIdsByNames = (list = [], names = []) =>
    list
      .filter(item => names.includes(item.name))
      .map(item => item.id);


  // Combine sunscreen IDs from skincare and bodycare
  const sunscreenIds = useMemo(() => {
    return [
      ...getIdsByNames(skincareSubCategories, ["Sunscreens", "Sunscreen Stick"]),
      ...getIdsByNames(bodycareSubCategories, ["Sunscreen"]),
    ].join("_");
  }, [skincareSubCategories, bodycareSubCategories]);

  // Combine hyperpigmentation IDs from skincare and bodycare
  const hyperpigmentationIds = useMemo(() => {
    return [
      ...getIdsByNames(skincareConcerns, ["Hyperpigmentation"]),
      ...getIdsByNames(bodycareConcerns, ["Body Hyperpigmentation"]),
    ].join("_");
  }, [skincareConcerns, bodycareConcerns]);

  // Get cleanser IDs from skincare subcategories
  const cleanserIds = useMemo(() => {
    return [
      ...getIdsByNames(skincareSubCategories, ["Cleansers"]),
    ].join("_");
  }, [skincareSubCategories]);

  // Get Vitamin C IDs from ingredients
  const vitaminCIds = useMemo(() => {
    return [
      ...getIdsByNames(skincareIngredients, ["Vitamin C"]),
      ...getIdsByNames(bodycareIngredients, ["Vitamin C"]),
    ].join("_");
  }, [skincareIngredients, bodycareIngredients]);

  // Get Acne IDs from concerns
  const acneIds = useMemo(() => {
    return [
      ...getIdsByNames(skincareConcerns, ["Acne"]),
      ...getIdsByNames(bodycareConcerns, ["Acne"]),
    ].join("_");
  }, [skincareConcerns, bodycareConcerns]);

  // Get Body Lotion IDs from bodycare subcategories
  const bodyLotionIds = useMemo(() => {
    return [
      ...getIdsByNames(bodycareSubCategories, ["Body Lotions"]),
    ].join("_");
  }, [bodycareSubCategories]);

  const bestSelling = [
    {
      imgSrc: "/images/home-best-selling/Circle1.png",
      alt: "collection-img",
      title: "Sunscreens",
      link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&sub_category=${sunscreenIds}`,
    },
    {
      imgSrc: "/images/home-best-selling/Circle2.png",
      alt: "collection-img",
      title: "Hyperpigmentation",
      link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&concerns=${hyperpigmentationIds}`,
    },
    {
      imgSrc: "/images/home-best-selling/Circle3.png",
      alt: "collection-img",
      title: "Cleansers",
      link: `/products?category=${skincareCategory?.id}&sub_category=${cleanserIds}`,
    },
    {
      imgSrc: "/images/home-best-selling/Circle4.png",
      alt: "collection-img",
      title: "Vitamin C",
      link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&ingredients=${vitaminCIds}`,
    },
    {
      imgSrc: "/images/home-best-selling/Circle5.png",
      alt: "collection-img",
      title: "Acne",
      link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&concerns=${acneIds}`,
    },
    {
      imgSrc: "/images/home-best-selling/Circle6.png",
      alt: "collection-img",
      title: "Body Lotions",
      link: `/products?category=${bodycareCategory?.id}&sub_category=${bodyLotionIds}`,
    },
  ];

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
