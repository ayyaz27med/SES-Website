"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function OrderDetails() {
  return (
    <div className="my-account-content">
      <div className="account-order-details">
        <div className="wd-form-order">
          <div className="order-head">
            <figure className="img-product">
              <Image
                alt="product"
                src="/images/products/womens/women-1.jpg"
                width={600}
                height={800}
              />
            </figure>
            <div className="content">
              <div className="badge">In Progress</div>
              <h6 className="mt-8 fw-5">Order #17493</h6>
            </div>
          </div>
          <div className="tf-grid-layout md-col-2 gap-15">
            <div className="item">
              <div className="text-2 text_black-2">Item</div>
              <div className="text-2 mt_4 fw-6">Fashion</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Courier</div>
              <div className="text-2 mt_4 fw-6">Ribbed modal T-shirt</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Start Time</div>
              <div className="text-2 mt_4 fw-6">
                04 September 2024, 13:30:23
              </div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Address</div>
              <div className="text-2 mt_4 fw-6">
                1234 Fashion Street, Suite 567, New York
              </div>
            </div>
          </div>
          <div className="widget-tabs style-3 widget-order-tab">
            <ul className="widget-menu-tab">
              <li
                className="item-title active"
              >
                <span className="inner">Item Details</span>
              </li>
            </ul>
            <div className="widget-content-tab">
              <div
                className="widget-content-inner active"
              >
                <div className="order-head">
                  <figure className="img-product">
                    <Image
                      alt="product"
                      src="/images/products/womens/women-1.jpg"
                      width={600}
                      height={800}
                    />
                  </figure>
                  <div className="content">
                    <div className="text-2 fw-6">Ribbed modal T-shirt</div>
                    <div className="mt_4">
                      <span className="fw-6">Price :</span> $28.95
                    </div>
                    <div className="mt_4">
                      <span className="fw-6">Size :</span> XL
                    </div>
                  </div>
                </div>
                <ul>
                  <li className="d-flex justify-content-between text-2">
                    <span>Total Price</span>
                    <span className="fw-6">$28.95</span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_4 pb_8 line-bt">
                    <span>Total Discounts</span>
                    <span className="fw-6">$10</span>
                  </li>
                  <li className="d-flex justify-content-between text-2 mt_8">
                    <span>Order Total</span>
                    <span className="fw-6">$18.95</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
