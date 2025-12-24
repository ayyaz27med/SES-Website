"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function ProductBreadcumb({ product }) {
  const router = useRouter();

  return (
    <div className="tf-breadcrumb">
      <div className="container">
        <div className="tf-breadcrumb-wrap">
          <div className="tf-breadcrumb-list">
            <div onClick={() => router.back()} className="text text-caption-1 text-decoration-underline" style={{ cursor: "pointer" }}>
              Products
            </div>
            <i className="icon icon-arrRight" />
            <span className="text text-caption-1 text-line-clamp-1">{product?.pname}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
