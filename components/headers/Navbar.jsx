import useBrands from "@/services/tanstack/queries/useBrands";
import useCategories from "@/services/tanstack/queries/useCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarItem from "./SubMenu";

const desiredOrder = [
  "Skincare",
  "Bodycare",
  "Wellbeing",
  "Haircare",
  "Makeup",
  "Baby & Child",
  "Fragrance",
  "Gifts",
];

export default function Navbar() {
  const pathname = usePathname();

  const { data: brandsData, isBrandsLoading } = useBrands({
    isServerSidePagination: true,
    start: 1,
    length: 60,
    "order[0][0]": "name",
    "order[0][1]": "DESC",
  });

  const { data: categoriesData, isCategoriesLoading } = useCategories({
    isServerSidePagination: true,
    "order[0][0]": "name",
    "order[0][1]": "ASC",
  });
  const brands = brandsData?.data || [];
  const categories = categoriesData?.data || [];

  const unique = categories.reduce((acc, curr) => {
    if (!acc.some((item) => item.name === curr.name)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const sortedCategories = unique.sort(
    (a, b) =>
      desiredOrder.indexOf(a.name) - desiredOrder.indexOf(b.name)
  );

  return (
    <>
      <li className="menu-item">
        <Link href="/" className="item-link">
          Home
        </Link>
      </li>
      <li
        className={`menu-item ${[...brands].some(
          (elm) => elm?.href?.split("/")[1] == pathname.split("/")[1]
        )
            ? "active"
            : ""
          } `}
      >
        <div href="#" className="item-link">
          Brands
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="row">
              <div className="mega-menu-item">
                <Link
                  href={"/products"}
                  className="menu-heading text-decoration-underline"
                >
                  View All Brands
                </Link>
                <div className="row gap-16">
                  <ul className="menu-list grid-6">
                    {brands.map((brand) => (
                      <li
                        key={brand?.id}
                        className={`menu-item-li ${pathname.split("/")[1] == brand?.href?.split("/")[1]
                            ? "active"
                            : ""
                          } `}
                      >
                        <Link href={`/products?brand=${brand?.id}`} className="menu-link-text">
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      {!isCategoriesLoading &&
        sortedCategories.map((category) => {
          return <NavbarItem category={category} key={category?.id} />;
        })}
      <li className="menu-item">
        <Link href="#" className="item-link">
          Sale
        </Link>
      </li>
      <li className="menu-item">
        <Link href="/blog-list" className="item-link">
          Blog
        </Link>
      </li>
    </>
  );
}
