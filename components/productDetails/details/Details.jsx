"use client";
import React, { useState } from "react";
import QuantitySelect from "../QuantitySelect";
import { useContextElement } from "@/context/Context";
import ProductStikyBottom from "../ProductStikyBottom";
import useProductDetails from "@/services/tanstack/queries/useProductDetails";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import ProductDetailsSlider from "../sliders/ProductDetailsSlider";
import Link from "next/link";
import Image from "next/image";
import ProductDescription from "../descriptions/ProductDescription";

export default function Details({ id }) {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1);
  const stickyRef = React.useRef(null);


  const {
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    isAddedtoCompareItem,
    addToCompareItem,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  const { data, isLoading } = useProductDetails(id);
  const product = data;

  const scrollToSticky = () => {
    stickyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const categoriesName = data?.category.map(c => c.name).join(", ");

  return (
    <section className="flat-spacing">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product default */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <ProductDetailsSlider
                  setActiveColor={setActiveColor}
                  activeColor={activeColor}
                  firstItem={data?.main_picture}
                  slideItems={data?.pictures}
                />
              </div>
            </div>
            {/* /Product default */}
            {/* tf-product-info-list */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap position-relative mw-100p-hidden ">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">{categoriesName}</div>
                      <h3 className="name">{product?.pname}</h3>
                      <div className="sub">
                        <div className="tf-product-info-rate">
                          <div className="list-star">
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                          </div>
                          <div className="text text-caption-1">
                            (134 reviews)
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          {formatWithCurrency(product?.new_selling_price ? product?.new_selling_price : product?.selling_price)}
                        </h5>
                        {product?.new_selling_price > 0 ? (
                          <>
                            <div className="compare-at-price font-2">
                              {formatWithCurrency(product?.selling_price)}
                            </div>
                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <p className="text text-line-clamp-4">
                        {product?.descr.slice(0, 280) + "..."}
                        {product?.descr.length > 280 && (
                          <span
                            style={{ cursor: "pointer", color: "#3DAB25", marginLeft: 4 }}
                            className="small"
                            onClick={() =>
                              scrollToSticky()
                            }
                          >
                            View More
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option">
                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(product?.id)
                            ? cartProducts.filter(
                              (elm) => elm.id == product?.id
                            )[0].quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product.id)) {
                            updateQuantity(product?.id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <div className="tf-product-info-by-btn mb_10">
                        <a
                          onClick={() => addProductToCart(product?.id, quantity)}
                          className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 btn-add-to-cart"
                        >
                          <span>
                            {isAddedToCartProducts(product?.id)
                              ? "Already Added"
                              : "Add to cart -"}
                          </span>
                          <span className="tf-qty-price total-price">
                            {formatWithCurrency(isAddedToCartProducts(product?.id)
                              ? (
                                (product.new_selling_price > 0 ? product.new_selling_price : product.selling_price) *
                                cartProducts.filter(
                                  (elm) => elm.id == product?.id
                                )[0].quantity
                              )
                              : (product.new_selling_price > 0 ? product.new_selling_price : product.selling_price) * quantity)}{" "}
                          </span>
                        </a>
                        <div
                          // href="#compare"
                          // data-bs-toggle="offcanvas"
                          // aria-controls="compare"
                          className="box-icon hover-tooltip compare btn-icon-action"
                        >
                          <div className="icon">
                            <i className="icon-share" />
                          </div>
                          <span className="tooltip text-caption-2">
                            Share
                          </span>
                        </div>
                        <a
                          onClick={() => addToWishlist(product?.id)}
                          className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip text-caption-2">
                            {isAddedtoWishlist(product?.id)
                              ? "Already Wishlished"
                              : "Wishlist"}
                          </span>
                        </a>
                      </div>
                      <a href="#" className="btn-style-3 text-btn-uppercase">
                        Buy it now
                      </a>
                    </div>
                    <div className="tf-product-info-help">
                      <Link
                        href="https://wa.me/255710071612"
                        target="_blank"
                        className="tf-product-extra-icon tf-product-info-time"
                      >
                        <div className="icon">
                          <i className="icon-question" />
                        </div>
                        <p className="text-caption-1">Ask A Question</p>
                      </Link>
                      <div className="tf-product-info-time">
                        <div className="icon">
                          <Image
                            className="lazyload"
                            data-src="/images/section/404.png"
                            alt="image"
                            src="/images/icons/fast-delivery-bike.png"
                            width={20}
                            height={20}
                          />
                        </div>
                        <p className="text-caption-1">
                          Dar es Salaam: Orders placed before 6 PM will be delivered the same day
                        </p>
                      </div>
                      <div className="tf-product-info-time">
                        <div className="icon">
                          <i className="icon-shipping" />
                        </div>
                        <p className="text-caption-1">
                          Outside Dar es Salaam: Orders placed before 6 PM will be dispatched the same day
                        </p>
                      </div>
                      <div className="dropdown dropdown-store-location">
                        <div
                          className="dropdown-title dropdown-backdrop"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                        >
                          <div className="tf-product-info-view link">
                            <div className="icon">
                              <i className="icon-map-pin" />
                            </div>
                            <span>View Store Information</span>
                          </div>
                        </div>
                        <div className="dropdown-menu dropdown-menu-end">
                          <div className="dropdown-content">
                            <div className="dropdown-content-heading">
                              <h5>Store Location</h5>
                              <i className="icon icon-close" />
                            </div>
                            <div className="line-bt" />
                            <div>
                              <h6>SES Cosmetics</h6>
                              <p>Monday to Saturday: 8am to 6pm</p>
                              <p>Sunday: 10am to 6pm</p>
                            </div>
                            <div>
                              <p>1st Floor, Girls Guide Building,</p>
                              <p>Kibasila St, Upanga - Dar es Salaam</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="tf-product-info-sku border-none">
                      <li>
                        <p className="text-caption-1">SKU:</p>
                        <p className="text-caption-1 text-1">{product?.refno}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Brand:</p>
                        <p className="text-caption-1 text-1">{product?.brand?.name}</p>
                      </li>
                      <li>
                        <p className="text-caption-1">Available:</p>
                        <p className="text-caption-1 text-1">Instock</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="pt-5" ref={stickyRef}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="widget-tabs style-1">
                <div className="widget-content-tab">
                  <div className="widget-content-inner active">
                    <div className="tab-description">
                      <ProductDescription product={product} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductStikyBottom />
    </section>
  );
}
