"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useOrderDetails from "@/services/tanstack/queries/useOrderDetails";
export default function OrderDetails() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  const { data: orderDetails } = useOrderDetails(order_id);

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
              <div className="badge">{orderDetails?.status}</div>
              <h6 className="mt-8 fw-5">Order #{orderDetails?.order_no}</h6>
            </div>
          </div>
          <div className="tf-grid-layout md-col-2 gap-15">
            <div className="item">
              <div className="text-2 text_black-2">Item</div>
              <div className="text-2 mt_4 fw-6">{"-"}</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Start Time</div>
              <div className="text-2 mt_4 fw-6">{orderDetails?.created_at}</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Address</div>
              <div className="text-2 mt_4 fw-6">
                {orderDetails?.address || "-"}
              </div>
            </div>
          </div>
          <div className="widget-tabs style-3 widget-order-tab">
            <ul className="widget-menu-tab">
              <li className="item-title active">
                <span className="inner">Item Details</span>
              </li>
            </ul>
            <div className="widget-content-tab">
              <div className="widget-content-inner active">
                {orderDetails?.items.map((item) => {
                  return (
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
                        <div className="text-2 fw-6">{item?.product?.pname}</div>
                        <div className="mt_4">
                          <span className="fw-6">Price :</span> ${item?.selling_price}
                        </div>
                        <div className="mt_4">
                          <span className="fw-6">Size :</span> -
                        </div>
                      </div>
                    </div>
                  );
                })}

                <ul>
                  <li className="d-flex justify-content-between text-2 line-bt">
                    <span>Total Price</span>
                    <span className="fw-6">${orderDetails?.grandtotal}</span>
                  </li>
                  {/* <li className="d-flex justify-content-between text-2 mt_4 pb_8 line-bt">
                    <span>Total Discounts</span>
                    <span className="fw-6">$10</span>
                  </li> */}
                  <li className="d-flex justify-content-between text-2 mt_8">
                    <span>Order Total</span>
                    <span className="fw-6">${orderDetails?.grandtotal}</span>
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
