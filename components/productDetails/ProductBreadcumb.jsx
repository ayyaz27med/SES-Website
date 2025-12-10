"use client";
import React from "react";
import Link from "next/link";
import { allProducts } from "@/data/products";
import { usePathname, useRouter } from "next/navigation";
import useProductDetails from "@/services/tanstack/queries/useProductDetails";

export default function ProductBreadcumb({ id }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useProductDetails(id);
  const product = data;

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
