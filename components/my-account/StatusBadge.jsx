"use client";
import React from "react";

export default function OrderStatus({ status = "" }) {
  return (
    <span
      className='status-badge'
      data-status={status.toLowerCase()}
    >
      {status}
    </span>
  );
}
