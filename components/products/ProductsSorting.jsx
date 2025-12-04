"use client";

import { productFilterOptions } from "@/utlis/productList";

export default function ProductsSorting({ allProps }) {
  return (
    <div className="tf-dropdown-sort" data-bs-toggle="dropdown">
      <div className="btn-select">
        <span className="text-sort-value">{allProps.sortingOption}</span>
        <span className="icon icon-arrow-down" />
      </div>
      <div className="dropdown-menu">
        {Object.keys(productFilterOptions).map((option) => {
          console.log("option", option);
          return (
            <div
              onClick={() => allProps.setSortingOption(option)}
              key={option}
              className={`select-item ${allProps.sortingOption == option ? "active" : ""
                }`}
            >
              <span className="text-value-item">{option}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
