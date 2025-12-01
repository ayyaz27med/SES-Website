import useSubCategories from "@/services/tanstack/queries/useSubCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SUBCATEGORY_TYPES = [
  { key: "sub_category", label: "Sub Categories" },
  { key: "concerns", label: "Concerns" },
  { key: "suitable", label: "Suitable For" },
  { key: "ingredients", label: "Ingredients" },
];

export default function MobileNavbarItem({ category }) {
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
    <li className="nav-mb-item active" key={category?.id}>
      <a
        href={`#${category?.id}`}
        className={`collapsed mb-menu-link ${isActiveMain ? "active"
          : ""
          } `}
        data-bs-toggle="collapse"
        aria-expanded="true"
        aria-controls={category?.id}
      >
        <span>{category?.name}</span>
        <span className="btn-open-sub" />
      </a>
      <div id={category?.id} className="collapse">
        {subCategorySections
          .filter(
            (section) => !section.isLoading && section.data.length > 0
          )
          .map((section) => {
            return (
              <ul className="sub-nav-menu">
                <li className="sub-nav-link fw-6">{section.label}</li>
                {!section.isLoading &&
                  section?.data.map((item) => {
                    const isActiveChild =
                      pathname.split("/")[1] === item?.name?.split("/")[0];
                    return (
                      <li key={item.id}>
                        <Link
                          href={`/products/${item?.id}`}
                          className={`sub-nav-link ${isActiveChild
                            ? "active"
                            : ""
                            } `}
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
