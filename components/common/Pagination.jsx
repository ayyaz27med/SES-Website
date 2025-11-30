"use client";
import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages < 1) totalPages = 1;

  const handle = (p) => {
    if (p >= 1 && p <= totalPages) onPageChange(p);
  };

  return (
    <>
      {/* Prev */}
      <li onClick={() => handle(currentPage - 1)}>
        <div
          className={`pagination-item text-button ${
            currentPage === 1 ? "disabled" : ""
          }`}
        >
          <i className="icon-arrLeft" />
        </div>
      </li>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <li
          key={i + 1}
          className={currentPage === i + 1 ? "active" : ""}
          onClick={() => handle(i + 1)}
        >
          <div className="pagination-item text-button">{i + 1}</div>
        </li>
      ))}

      {/* Next */}
      <li onClick={() => handle(currentPage + 1)}>
        <div
          className={`pagination-item text-button ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <i className="icon-arrRight" />
        </div>
      </li>
    </>
  );
}
