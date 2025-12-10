"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CountdownTimer from "../common/Countdown";

import { useContextElement } from "@/context/Context";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import safeImage from "@/utlis/safeImage";
export default function ProductsCards6({ product }) {
  const [currentImage, setCurrentImage] = useState(product.main_picture);

  const {
    setQuickAddItem,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  if (!product) {
    return null;
  }

  return (
    <div
      className="card-product style-list"
      data-availability="In stock"
      data-brand="gucci"
    >
      <div className="card-product-wrapper">
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={safeImage(currentImage)}
            alt={`${product.pname} front view`}
            width={600}
            height={800}
          />
          <Image
            className="lazyload img-hover"
            src={safeImage(currentImage)}
            alt={`${product.pname} hover view`}
            width={600}
            height={800}
          />
        </Link>
        {product.sales_percentage > 0 && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.sales_percentage}%</span>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.pname}
        </Link>
        <span className="price current-price">
          {product?.new_selling_price > 0 && <span className="old-price">{formatWithCurrency(product?.selling_price)}</span>}
          {formatWithCurrency(product?.new_selling_price > 0 ? product?.new_selling_price : product?.selling_price)}
        </span>
        {/* <p className="description text-secondary text-line-clamp-2">
          {product?.descr}
        </p> */}
        <div className="variant-wrap-list">
          {product.colors && (
            <ul className="list-color-product">
              {product.colors.map((color, index) => (
                <li
                  key={index}
                  className={`list-color-item color-swatch ${currentImage == color.imgSrc ? "active" : ""
                    } `}
                  onMouseOver={() => setCurrentImage(color.imgSrc)}
                >
                  <span className={`swatch-value ${color.bgColor}`} />
                  <Image
                    className="lazyload"
                    src={safeImage(color.imgSrc)}
                    alt="color variant"
                    width={600}
                    height={800}
                  />
                </li>
              ))}
            </ul>
          )}
          {product.sizes && (
            <div className="size-box list-product-btn">
              <span className="size-item box-icon">S</span>
              <span className="size-item box-icon">M</span>
              <span className="size-item box-icon">L</span>
              <span className="size-item box-icon">XL</span>
              <span className="size-item box-icon disable">XXL</span>
            </div>
          )}
          <div className="list-product-btn">
            <a
              onClick={() => addProductToCart(product.id)}
              className="btn-main-product"
            >
              {isAddedToCartProducts(product.id)
                ? "Already Added"
                : "Add To cart"}
            </a>
            <a
              onClick={() => addToWishlist(product.id)}
              className="box-icon wishlist btn-icon-action"
            >
              <span className="icon icon-heart" />
              <span className="tooltip">
                {isAddedtoWishlist(product.id)
                  ? "Already Wishlished"
                  : "Wishlist"}
              </span>
            </a>
            <a
              href="#compare"
              data-bs-toggle="offcanvas"
              aria-controls="compare"
              onClick={() => addToCompareItem(product.id)}
              className="box-icon compare btn-icon-action"
            >
              <span className="icon icon-gitDiff" />
              <span className="tooltip">
                {" "}
                {isAddedtoCompareItem(product.id)
                  ? "Already compared"
                  : "Compare"}
              </span>
            </a>
            <a
              href="#quickView"
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
              className="box-icon quickview tf-btn-loading"
            >
              <span className="icon icon-eye" />
              <span className="tooltip">Quick View</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
