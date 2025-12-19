"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import safeImage from "@/utlis/safeImage";
import { useCartContextElement } from "@/context/CartContext";
export default function CartModal() {
  const {
    cartProducts,
    setCartProducts,
    totalPrice,
  } = useCartContextElement();

  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  const [currentOpenPopup, setCurrentOpenPopup] = useState("");

  return (
    <div className="modal fullRight fade modal-shopping-cart" id="shoppingCart">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="d-flex flex-column flex-grow-1 h-100">
            <div className="header">
              <h5 className="title">Shopping Cart</h5>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="wrap">
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">
                    {cartProducts.length ? (
                      <div className="tf-mini-cart-items">
                        {cartProducts.map((product, i) => {
                          return (
                            <div
                              key={i}
                              className="tf-mini-cart-item file-delete"
                            >
                              <div className="tf-mini-cart-image">
                                <Image
                                  className="lazyload"
                                  alt=""
                                  src={safeImage(product.main_picture)}
                                  width={600}
                                  height={800}
                                />
                              </div>
                              <div className="tf-mini-cart-info flex-grow-1">
                                <div className="mb_12 d-flex align-items-center justify-content-between gap-12">
                                  <div className="text-title ">
                                    <Link
                                      href={`/product-detail/${product.id}`}
                                      className="link text-line-clamp-1"
                                    >
                                      {product.pname}
                                    </Link>
                                  </div>
                                  <div
                                    className="text-button tf-btn-remove remove"
                                    onClick={() => removeItem(product.id)}
                                  >
                                    Remove
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-end gap-12">
                                  <div className="text-button">
                                    {product.quantity} X {" "}
                                    {formatWithCurrency(product?.new_selling_price > 0 ? product?.new_selling_price : product.selling_price)}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="p-4">
                        Your Cart is empty. Start adding favorite products to
                        cart!{" "}
                        <Link className="btn-line" href="/products">
                          Explore Products
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="tf-mini-cart-bottom">
                  <div className="tf-mini-cart-bottom-wrap">
                    <div className="tf-cart-totals-discounts">
                      <h5>Subtotal</h5>
                      <h5 className="tf-totals-total-value">
                        {formatWithCurrency(totalPrice)}
                      </h5>
                    </div>
                    <div className="tf-mini-cart-view-checkout">
                      <span
                        data-bs-dismiss="modal"
                        className="tf-btn w-100 btn-white radius-4 has-border"
                      >
                        <span className="text">Continue shopping</span>
                      </span>
                      <Link
                        href={`/shopping-cart`}
                        className="tf-btn w-100 btn-fill radius-4"
                      >
                        <span className="text">View cart</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
