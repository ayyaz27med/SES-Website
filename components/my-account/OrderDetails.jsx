"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import useOrderDetails from "@/services/tanstack/queries/useOrderDetails";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import OrderStatus from "./StatusBadge";
import ContentLoader from "../common/ContentLoader";

export default function OrderDetails() {
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  const { data: orderDetails, isLoading } = useOrderDetails(order_id);

  if (isLoading) {
    return <ContentLoader image="/images/loaders/beauty-cute.gif" height="500px" />;
  }

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
              <OrderStatus status={orderDetails?.status} />
              <h6 className="mt-8 fw-5">Order #{orderDetails?.order_no}</h6>
            </div>
          </div>
          <div className="tf-grid-layout md-col-2 gap-15">
            <div className="item">
              <div className="text-2 text_black-2">Order Source</div>
              <div className="text-2 mt_4 fw-6">{orderDetails?.order_source_type?.source_name}</div>
            </div>
            <div className="item">
              <div className="text-2 text_black-2">Order Date</div>
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
                    <div className="order-head" key={item?.id}>
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
                          <span className="fw-6">Price :</span>{" "}
                          {item?.total_qty > 1 ? (
                            <>
                              {formatWithCurrency(item?.selling_price)}{" "}
                              <span className="text_black-2">
                                ~ (x{item?.total_qty} -{" "}
                                {formatWithCurrency(item?.selling_price * item?.total_qty)})
                              </span>
                            </>
                          ) : (
                            formatWithCurrency(item?.selling_price)
                          )}
                        </div>
                        <div className="mt_4">
                          <span className="fw-6">Quantity :</span> {item?.total_qty}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <ul>
                  <li className="d-flex justify-content-between text-2">
                    <span>Total Price</span>
                    <span className="fw-6">{formatWithCurrency(orderDetails?.grandtotal)}</span>
                  </li>
                  {orderDetails?.delivery_price > 0 && (
                    <li className="d-flex justify-content-between text-2 mt_8 pt_8 line-top">
                      <span>Delivery Price</span>
                      <span className="fw-6">{formatWithCurrency(orderDetails?.delivery_price)}</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
