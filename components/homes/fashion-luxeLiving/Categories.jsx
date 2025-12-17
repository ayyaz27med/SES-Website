"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useCategories from "@/services/tanstack/queries/useCategories";
import useSubCategories from "@/services/tanstack/queries/useSubCategories";

export default function Categories() {
  const { data: categoriesData } = useCategories({
    isServerSidePagination: true,
    "order[0][0]": "name",
    "order[0][1]": "ASC",
  });
  const categories = categoriesData?.data || []
  const skincareCategory = categories.find((category) => category.name === "Skincare")
  const bodycareCategory = categories.find((category) => category.name === "Bodycare")
  const haircareCategory = categories.find((category) => category.name === "Haircare")

  const { data: skincareSubCategoriesData } = useSubCategories({
    category_id: skincareCategory?.id,
    type: 'sub_category',
  });
  const skincareSubCategories = skincareSubCategoriesData?.sub_category ?? [];
  const skincareToolSubCategory = skincareSubCategories.find(
    c => c.name === "Skincare Tools"
  );

  const { data: bodycareSubCategoriesData } = useSubCategories({
    category_id: bodycareCategory?.id,
    type: 'sub_category',
  });
  const bodycareSubCategories = bodycareSubCategoriesData?.sub_category ?? [];
  const bodycareToolSubCategory = bodycareSubCategories.find(
    c => c.name === "Body Tools"
  );

  const { data: haircareSubCategoriesData } = useSubCategories({
    category_id: haircareCategory?.id,
    type: 'sub_category',
  });
  const haircareSubCategories = haircareSubCategoriesData?.sub_category ?? [];
  const haircareToolSubCategory = haircareSubCategories.find(
    c => c.name === "Hair Tools"
  );

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop by categories</h3>
        </div>
        <div className="grid-cls grid-cls-v1">
          <div className="item1 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square1.png"
                alt="banner-cls"
                src="/images/home-categories/Square1.png"
                width={615}
                height={819}
              />
            </a>
            <div className="content">
              <Link href={`/products?category=${skincareCategory?.id}`} className="cls-btn">
                <h6 className="text">Skincare</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item2 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square2.png"
                alt="banner-cls"
                src="/images/home-categories/Square2.png"
                width={615}
                height={258}
                style={{ height: "258px", objectFit: "cover" }}
              />
            </a>
            <div className="content">
              <Link href={`/products?category=${bodycareCategory?.id}`} className="cls-btn">
                <h6 className="text">Bodycare</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item3 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square3.png"
                alt="banner-cls"
                src="/images/home-categories/Square3.png"
                width={615}
                height={258}
                style={{ height: "258px", objectFit: "cover" }}
              />
            </a>
            <div className="content">
              <Link href={`/products?category=${haircareCategory?.id}`} className="cls-btn">
                <h6 className="text">Haircare</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item4 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square4.png"
                alt="banner-cls"
                src="/images/home-categories/Square4.png"
                width={615}
                height={819}
              />
            </a>
            <div className="content">
              <Link href={`/products?category=${skincareCategory?.id}_${bodycareCategory?.id}_${haircareCategory?.id}&sub_category=${skincareToolSubCategory?.id}_${bodycareToolSubCategory?.id}_${haircareToolSubCategory?.id}`} className="cls-btn">
                <h6 className="text">Tools</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
