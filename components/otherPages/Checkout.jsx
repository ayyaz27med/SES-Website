"use client";

import { useCartContextElement } from "@/context/CartContext";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import safeImage from "@/utlis/safeImage";
import Image from "next/image";
import Link from "next/link";

export default function Checkout() {
  const { cartProducts, totalPrice } = useCartContextElement();
  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="flat-spacing tf-page-checkout">
              <div className="wrap">
                <h5 className="title">Information</h5>
                <form className="info-box" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid-2">
                    <input type="text" placeholder="First Name*" />
                    <input type="text" placeholder="Last Name*" />
                  </div>
                  <div className="grid-2">
                    <input type="text" placeholder="Email Address*" />
                    <input type="text" placeholder="Phone Number*" />
                  </div>
                  <div className="tf-select">
                    <select
                      className="text-title"
                      name="address[country]"
                      defaultValue=""
                    >
                      <option value="">Choose Country/Region</option>
                      <option value="United States">United States</option>
                    </select>                  </div>
                  <div className="grid-2">
                    <input type="text" placeholder="Town/City*" />
                    <input type="text" placeholder="Street,..." />
                  </div>
                  <div className="grid-2">
                    <div className="tf-select">
                      <select className="text-title" data-default="">
                        <option value="">Choose State</option>
                        <option value="California">California</option>
                      </select>
                    </div>
                    <input type="text" placeholder="Postal Code*" />
                  </div>
                  <textarea placeholder="Write note..." />
                </form>
              </div>
              <div className="wrap">
                <h5 className="title">Choose payment Option:</h5>
                <form
                  className="form-payment"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="payment-box" id="payment-box">
                    <div className="payment-item payment-choose-card active">
                      <label
                        htmlFor="credit-card-method"
                        className="payment-header"
                        data-bs-toggle="collapse"
                        data-bs-target="#credit-card-payment"
                        aria-controls="credit-card-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="credit-card-method"
                          defaultChecked
                        />
                        <span className="text-title">Credit Card</span>
                      </label>
                      <div
                        id="credit-card-payment"
                        className="collapse show"
                        data-bs-parent="#payment-box"
                      >
                        <div className="payment-body">
                          <p className="text-secondary">
                            Make your payment directly into our bank account.
                            Your order will not be shipped until the funds have
                            cleared in our account.
                          </p>
                          <div className="input-payment-box">
                            <input type="text" placeholder="Name On Card*" />
                            <div className="ip-card">
                              <input type="text" placeholder="Card Numbers*" />
                              <div className="list-card">
                                <Image
                                  width={48}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-7.png"
                                />
                                <Image
                                  width={21}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-8.png"
                                />
                                <Image
                                  width={22}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-9.png"
                                />
                                <Image
                                  width={24}
                                  height={16}
                                  alt="card"
                                  src="/images/payment/img-10.png"
                                />
                              </div>
                            </div>
                            <div className="grid-2">
                              <input type="date" />
                              <input type="text" placeholder="CVV*" />
                            </div>
                          </div>
                          <div className="check-save">
                            <input
                              type="checkbox"
                              className="tf-check"
                              id="check-card"
                              defaultChecked
                            />
                            <label htmlFor="check-card">
                              Save Card Details
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="payment-item">
                      <label
                        htmlFor="delivery-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#delivery-payment"
                        aria-controls="delivery-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="delivery-method"
                        />
                        <span className="text-title">Cash on delivery</span>
                      </label>
                      <div
                        id="delivery-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                    <div className="payment-item">
                      <label
                        htmlFor="apple-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#apple-payment"
                        aria-controls="apple-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="apple-method"
                        />
                        <span className="text-title apple-pay-title">
                          <Image
                            alt="apple"
                            src="/images/payment/applePay.png"
                            width={13}
                            height={18}
                          />
                          Apple Pay
                        </span>
                      </label>
                      <div
                        id="apple-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                    <div className="payment-item paypal-item">
                      <label
                        htmlFor="paypal-method"
                        className="payment-header collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#paypal-method-payment"
                        aria-controls="paypal-method-payment"
                      >
                        <input
                          type="radio"
                          name="payment-method"
                          className="tf-check-rounded"
                          id="paypal-method"
                        />
                        <span className="paypal-title">
                          <Image
                            alt="apple"
                            src="/images/payment/paypal.png"
                            width={90}
                            height={23}
                          />
                        </span>
                      </label>
                      <div
                        id="paypal-method-payment"
                        className="collapse"
                        data-bs-parent="#payment-box"
                      />
                    </div>
                  </div>
                  <button className="tf-btn btn-reset">Payment</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-1">
            <div className="line-separation" />
          </div>
          <div className="col-xl-5">
            <div className="flat-spacing flat-sidebar-checkout">
              <div className="sidebar-checkout-content">
                <h5 className="title">Shopping Cart</h5>
                <div className="list-product">
                  {cartProducts.map((elm, i) => {
                    const price = elm?.new_selling_price > 0 ? elm?.new_selling_price : elm.selling_price;
                    return (
                      <div key={i} className="item-product">
                        <Link
                          href={`/product-detail/${elm.id}`}
                          className="img-product"
                        >
                          <Image
                            alt="img-product"
                            src={safeImage(elm.main_picture)}
                            width={90}
                            height={90}
                          />
                        </Link>
                        <div className="content-box">
                          <div className="info">
                            <Link
                              href={`/product-detail/${elm.id}`}
                              className="name-product link text-title"
                            >
                              {elm.pname}
                            </Link>
                          </div>
                          <div className="total-price text-button d-flex">
                            <span className="count">{elm.quantity}</span>X
                            <span className="price max-content">{formatWithCurrency(price)}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="sec-total-price">
                  <div className="top">
                    <div className="item d-flex align-items-center justify-content-between text-button">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                  </div>
                  <div className="bottom">
                    <h5 className="d-flex justify-content-between">
                      <span>Total</span>
                      <span className="total-price-checkout">
                        {formatWithCurrency(totalPrice)}
                      </span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
