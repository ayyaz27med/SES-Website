import React from "react";
import Pagination from "../common/Pagination";
import ProductCard from "../productCards/ProductCard";

export default function ProductGridView({ products, pagination = true, page, totalPages, setPage }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product?.id} product={product} gridClass="grid" />
      ))}
      {/* PAGINATION */}
      {pagination && totalPages > 1 && (
        <ul className="wg-pagination mt_20 wg-pagination justify-content-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </ul>
      )}
    </>
  );
}
