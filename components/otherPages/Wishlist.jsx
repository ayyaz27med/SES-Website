"use client";

import ProductCard1 from "../productCards/ProductCard1";
import Pagination from "../common/Pagination";
import Link from "next/link";
import useWishlist from "@/services/tanstack/queries/useWishlist";
import useToggleWishlist from "@/services/tanstack/mutations/useToggleWishlist";
import ToastHelper from "@/helpers/toastHelper";
import { queryClient } from "@/utlis/queryClient";
import { queryKeys } from "@/services/tanstack/queries";
import ProductCard from "../productCards/ProductCard";
import { useState } from "react";

export default function Wishlist() {
  const [page, setPage] = useState(1);
  const length = 10;

  const { data } = useWishlist({
    isServerSidePagination: true,
  });
  const wishlist = data?.data || []
  const total = Number(data?.count || 0);
  const totalPages = Math.ceil(total / length);

  // const { mutate: toggleWishlist, isPending } =
  //   useToggleWishlist({
  //     onSuccess: async (data) => {
  //       const { data: userData, message } = data;
  //       setUser(userData);
  //       ToastHelper.success(message);
  //       queryClient.invalidateQueries({
  //         queryKey: [queryKeys.wishlist],
  //       });
  //     },
  //     onError: (data) => {
  //       const { message } = data;
  //       ToastHelper.error(message);
  //     },
  //   });

  return (
    <section className="flat-spacing">
      <div className="container">
        {wishlist.length ? (
          <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
            {/* card product 1 */}
            {wishlist.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}

            {/* pagination */}
            <ul className="wg-pagination justify-content-center">
              <Pagination
                page={page}
                totalPages={totalPages}
                setPage={setPage}
              />
            </ul>
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
