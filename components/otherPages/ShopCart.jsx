"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import safeImage from "@/utlis/safeImage";
import { useCartContextElement } from "@/context/CartContext";
import { useSession } from "@/store/session";

export default function ShopCart() {
  const { cartProducts, setCartProducts, totalPrice } = useCartContextElement();
  const { isAuthenticated } = useSession();
  const setQuantity = (id, quantity) => {
    if (quantity >= 1) {
      const item = cartProducts.filter((elm) => elm.id == id)[0];
      const items = [...cartProducts];
      const itemIndex = items.indexOf(item);
      item.quantity = quantity;
      items[itemIndex] = item;
      setCartProducts(items);
    }
  };
  const removeItem = (id) => {
    setCartProducts((pre) => [...pre.filter((elm) => elm.id != id)]);
  };

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="tf-cart-sold">
                <div className="notification-sold bg-surface">
                  <Image
                    className="icon"
                    alt="img"
                    src="/images/logo/icon-fire.png"
                    width={48}
                    height={49}
                  />
                  <div className="count-text">Your items aren’t reserved, checkout quickly to make sure you don’t miss out</div>
                </div>
                <div className="tf-product-info-list mw-100">
                  <div className="text tf-product-info-sold">
                    <i className="icon icon-lightning" /> Items are not reserved until order is placed.
                  </div>
                </div>
              </div>
              {cartProducts.length ? (
                <form onSubmit={(e) => e.preventDefault()}>
                  <table className="tf-table-page-cart">
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((elm, i) => {
                        const price = elm.new_selling_price > 0 ? elm.new_selling_price : elm.selling_price;
                        return (
                          <tr key={i} className="tf-cart-item file-delete">
                            <td className="tf-cart-item_product">
                              <Link
                                href={`/product-detail/${elm.id}`}
                                className="img-box"
                              >
                                <Image
                                  alt="product"
                                  src={safeImage(elm.main_picture)}
                                  width={600}
                                  height={800}
                                />
                              </Link>
                              <div className="cart-info">
                                <Link
                                  href={`/product-detail/${elm.id}`}
                                  className="cart-title link"
                                >
                                  {elm.pname}
                                </Link>
                              </div>
                            </td>
                            <td
                              data-cart-title="Price"
                              className="tf-cart-item_price text-center"
                            >
                              <div className="cart-price text-button price-on-sale">
                                {formatWithCurrency(price)}
                              </div>
                            </td>
                            <td
                              data-cart-title="Quantity"
                              className="tf-cart-item_quantity"
                            >
                              <div className="wg-quantity mx-md-auto">
                                <span
                                  className="btn-quantity btn-decrease"
                                  onClick={() =>
                                    setQuantity(elm.id, elm.quantity - 1)
                                  }
                                >
                                  -
                                </span>
                                <input
                                  type="text"
                                  className="quantity-product"
                                  name="number"
                                  value={elm.quantity}
                                  readOnly
                                />
                                <span
                                  className="btn-quantity btn-increase"
                                  onClick={() =>
                                    setQuantity(elm.id, elm.quantity + 1)
                                  }
                                >
                                  +
                                </span>
                              </div>
                            </td>
                            <td
                              data-cart-title="Total"
                              className="tf-cart-item_total text-center"
                            >
                              <div className="cart-total text-button total-price">
                                {formatWithCurrency(price * elm.quantity)}
                              </div>
                            </td>
                            <td
                              data-cart-title="Remove"
                              className="remove-cart"
                              onClick={() => removeItem(elm.id)}
                            >
                              <span className="remove icon icon-close" />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </form>
              ) : (
                <div>
                  Your Cart is empty. Start adding favorite products to cart!{" "}
                  <Link className="btn-line" href="/shop-default-grid">
                    Explore Products
                  </Link>
                </div>
              )}
            </div>
            <div className="col-xl-4">
              <div className="fl-sidebar-cart">
                <div className="box-order bg-surface">
                  <h5 className="title">Order Summary</h5>
                  <div className="subtotal text-button d-flex justify-content-between align-items-center">
                    <span>Subtotal</span>
                    <span className="total">{formatWithCurrency(totalPrice)}</span>
                  </div>
                  <div className="ship">
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="text-button">Shipping</span>
                      <span className="text-button">Free</span>
                    </div>
                    <span className="text-caption-1 fw-6">Delivery cost is estimated and may change depending on the exact location</span>
                    <div>
                      <div className="text-caption-1 text-secondary mb_8">
                        State
                      </div>
                      <div className="tf-select">
                        <select
                          className="text-title"
                          name="address[country]"
                          data-default=""
                        >
                          <option
                            value="Australia"
                            data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]"
                          >
                            Australia
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="text-caption-1 text-secondary mb_8">
                        City
                      </div>
                      <div className="tf-select">
                        <select
                          className="text-title"
                          name="address[country]"
                          data-default=""
                        >
                          <option
                            value="Australia"
                            data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]"
                          >
                            City
                          </option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="text-caption-1 text-secondary mb_8">
                        Area
                      </div>
                      <div className="tf-select">
                        <select
                          className="text-title"
                          name="address[country]"
                          data-default=""
                        >
                          <option
                            value="Australia"
                            data-provinces="[['Australian Capital Territory','Australian Capital Territory'],['New South Wales','New South Wales'],['Northern Territory','Northern Territory'],['Queensland','Queensland'],['South Australia','South Australia'],['Tasmania','Tasmania'],['Victoria','Victoria'],['Western Australia','Western Australia']]"
                          >
                            Area
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <h5 className="total-order d-flex justify-content-between align-items-center">
                    <span>Total</span>
                    <span className="total">
                      {formatWithCurrency(totalPrice)}
                    </span>
                  </h5>
                  <div className="box-progress-checkout">
                    <fieldset className="check-agree">
                      <label htmlFor="check-agree">
                        I agree with the {" "}
                        <Link href={`/term-of-use`}>terms and conditions</Link>
                      </label>
                    </fieldset>
                    <Link
                      href={
                        isAuthenticated
                          ? "/checkout"
                          : "/login?redirect=/checkout"
                      }
                      className="tf-btn btn-reset"
                    >
                      Process To Checkout
                    </Link>
                    <Link href={'/products'} className="text-button text-center">
                      Or continue shopping
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
