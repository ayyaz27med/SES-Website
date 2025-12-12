import React from "react";
import ProductsCards6 from "../productCards/ProductsCards6";
import Pagination from "../common/Pagination";

export default function Listview({
  products,
  page,
  totalPages,
  setPage,
  pagination = true
}) {
  return (
    <>
      {/* card product list 1 */}
      {products.map((product) => (
        <ProductsCards6 product={product} key={product?.id} />
      ))}
      {/* pagination */}
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
