import React, { useState } from "react";
import Link from "next/link";
import useUserOrders from "@/services/tanstack/mutations/useUserOrders";
import Pagination from "../common/Pagination";
import { formatDate } from "@/helpers/dateTime";
import { useRouter } from "next/navigation";

export default function Orers({ setActiveTab }) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  let length = 10;

  const { data, isLoading } = useUserOrders({
    start: page,
    length,
    isServerSidePagination: true,
  });

  const orders = data?.data || [];
  const total = Number(data?.count || 0);
  const totalPages = Math.ceil(total / length);
  console.log("orders", orders, "total", total, "totalPages", totalPages);

  console.log("datadatadata", data);
  return (
    <div className="my-account-content">
      <div className="account-orders">
        <div className="wrap-account-order">
          <table>
            <thead>
              <tr>
                <th className="fw-6">Order</th>
                <th className="fw-6">Date</th>
                <th className="fw-6">Status</th>
                <th className="fw-6">Total</th>
                <th className="fw-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr className="tf-order-item" key={order?.id}>
                  <td>{order.order_no}</td>
                  <td>{formatDate(order.created_at, "MMMM DD, yyyy")}</td>
                  <td>{order.status}</td>
                  <td>₹{order.grandtotal}</td>
                  <td>
                    <div
                      className="tf-btn btn-fill radius-4"
                      onClick={() => {
                        router.push(`/my-account?order_id=${order?.id}`)
                        setActiveTab(3);
                      }}
                    >
                      <span className="text">View</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <ul className="wg-pagination mt_20">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(p) => setPage(p)}
              />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
