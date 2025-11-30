import useSubCategories from "@/services/tanstack/queries/useSubCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const SUBCATEGORY_TYPES = [
  { key: "sub_category", label: "Sub Categories" },
  { key: "concerns", label: "Concerns" },
  { key: "suitable", label: "Suitable For" },
  { key: "ingredients", label: "Ingredients" },
];

export default function NavbarItem({ category }) {
  const pathname = usePathname();

  const subCategorySections = SUBCATEGORY_TYPES.map((item) => {
    const { data, isLoading } = useSubCategories({
      category_id: category?.id,
      type: item.key,
    });
    return {
      ...item,
      data: data?.[item.key] || [],
      isLoading,
    };
  });

  const isActiveMain = subCategorySections.some((section) =>
    section.data.some(
      (item) => item.slug?.split("/")[0] === pathname.split("/")[1]
    )
  );

  return (
    <li
      key={category?.id}
      className={`menu-item ${isActiveMain ? "active" : ""}`}
    >
      <div href="#" className="item-link">
        {category?.name}
        <i className="icon icon-arrow-down" />
      </div>

      <div className="sub-menu mega-menu">
        <div className="container">
          <div className="mega-menu-item">
            <Link
              href="/products"
              className="menu-heading text-decoration-underline"
            >
              View All {category?.name}
            </Link>

            <div className="row gap-16">
              {subCategorySections
                .filter(
                  (section) => !section.isLoading && section.data.length > 0
                )
                .map((section, index) => (
                  <ul className="menu-list col" key={index}>
                    <li className="menu-heading">{section.label}</li>
                    {!section.isLoading &&
                      section?.data.map((item) => {
                        const isActiveChild =
                          pathname.split("/")[1] === item?.name?.split("/")[0];
                        return (
                          <li
                            key={item.id}
                            className={`menu-item-li ${
                              isActiveChild ? "active" : ""
                            }`}
                          >
                            <Link
                              href={`/product/${item?.id}`}
                              className="menu-link-text"
                            >
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                ))}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
