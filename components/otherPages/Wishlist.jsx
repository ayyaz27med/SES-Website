"use client";

import Pagination from "../common/Pagination";
import Link from "next/link";
import useWishlist from "@/services/tanstack/queries/useWishlist";
import ProductCard from "../productCards/ProductCard";
import { useState } from "react";
import FullScreenLoader from "../common/FullScreenLoader";

export default function Wishlist() {
  const [page, setPage] = useState(1);
  const length = 10;

  const { data, isLoading } = useWishlist({
    isServerSidePagination: true,
    'order[0][0]': 'created_at',
    'order[0][1]': 'DESC'
  });
  const wishlist = data?.data || []
  const total = Number(data?.count || 0);
  const totalPages = Math.ceil(total / length);

  if (isLoading) {
    return <FullScreenLoader image="/images/loaders/bubududu-panda.gif" />;
  }

  return (
    <section className="flat-spacing">
      <div className="container">
        {!isLoading && wishlist.length ? (
          <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
            {/* card product 1 */}
            {wishlist.map((item, i) => (
              <ProductCard key={i} product={item?.product} />
            ))}

            {/* pagination */}
            {totalPages > 1 && (
              <ul className="wg-pagination justify-content-center">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </ul>
            )}
          </div>
        ) : (
          <div className="p-5">
            Your wishlist is empty. Start adding your favorite products to save
            them for later!{" "}
            <Link className="btn-line" href="/products">
              Explore Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
