import useSubCategories from "@/services/tanstack/queries/useSubCategories";
import Link from "next/link";
import React from "react";

const SUBCATEGORY_TYPES = [
  { key: "sub_category", label: "Sub Categories" },
  { key: "concerns", label: "Concerns" },
  { key: "suitable", label: "Suitable For" },
  { key: "ingredients", label: "Ingredients" },
];

export default function MobileNavbarItem({ category }) {
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

  return (
    <li className="nav-mb-item active">
      <a
        href={`#${category?.id}`}
        className="collapsed mb-menu-link"
        data-bs-toggle="collapse"
        aria-expanded="true"
        aria-controls={category?.id}
      >
        <span>{category?.name}</span>
        <span className="btn-open-sub" />
      </a>
      <div id={category?.id} className="collapse">
        <Link
          href={`/products?category=${category?.id}`}
          className="menu-heading text-decoration-underline sub-nav-link fw-6 pl_4"
        >
          View All {category?.name}
        </Link>
        {subCategorySections
          .filter(
            (section) => !section.isLoading && section.data.length > 0
          )
          .map((section) => {
            return (
              <ul className="sub-nav-menu" key={section?.key}>
                <li className="sub-nav-link fw-6">{section.label}</li>
                {!section.isLoading &&
                  section?.data.map((item) => {
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/products?category=${category?.id}&${section.key}=${item?.id}`}
                          className="sub-nav-link"
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            );
          })}
      </div>
    </li>
  );
}
