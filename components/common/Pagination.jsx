"use client";
import React, { useMemo } from "react";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisible = 5, // configurable
}) {
  if (!totalPages || totalPages < 1) totalPages = 1;

  const handle = (p) => {
    if (p >= 1 && p <= totalPages && p !== currentPage) {
      onPageChange(p);
    }
  };

  const pages = useMemo(() => {
    const half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    // Adjust when near start
    if (currentPage <= half) {
      start = 1;
      end = Math.min(totalPages, maxVisible);
    }

    // Adjust when near end
    if (currentPage + half > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [currentPage, totalPages, maxVisible]);

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
      {pages.map((page) => (
        <li
          key={page}
          className={currentPage === page ? "active" : ""}
          onClick={() => handle(page)}
        >
          <div className="pagination-item text-button">{page}</div>
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
