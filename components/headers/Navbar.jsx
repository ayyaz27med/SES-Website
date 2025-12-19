import useCategories from "@/services/tanstack/queries/useCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NavbarItem from "./SubMenu";
import useBrandsGroup from "@/services/tanstack/queries/useBrandsGroup";

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

  const { data: brandsGroupData, isBrandsLoading } = useBrandsGroup({
    isServerSidePagination: true,
    "order[0][0]": "name",
    "order[0][1]": "DESC",
  });

  const { data: categoriesData, isCategoriesLoading } = useCategories({
    isServerSidePagination: true,
    "order[0][0]": "name",
    "order[0][1]": "ASC",
  });
  const brandGroups = brandsGroupData?.data || [];
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
  const viewBrands = brandGroups.find(
    (group) => group.name === "View Brands"
  );

  const sideBrandGroups = brandGroups.filter(
    (group) => group.name !== "View Brands"
  );

  return (
    <>
      <li className="menu-item">
        <Link href="/" className="item-link">
          Home
        </Link>
      </li>
      <li
        className={`menu-item ${[...viewBrands?.brands || [], ...sideBrandGroups.flatMap(group => group.brands) || []].some(
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
                  <div className="col-7">
                    <div className="menu-heading">{viewBrands?.name}</div>
                    <ul className="menu-list grid-4">
                      {viewBrands?.brands?.map((brand) => (
                        <li key={brand.id} className="menu-item-li">
                          <Link
                            href={`/products?brand=${brand.id}`}
                            className="menu-link-text"
                          >
                            {brand.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {sideBrandGroups.map((group) => (
                    <div className="col-2" key={group.id}>
                      <div className="menu-heading">{group.name}</div>
                      <ul key={group.id} className="menu-list grid-1">
                        {group.brands.map((brand) => (
                          <li key={brand.id} className="menu-item-li">
                            <Link
                              href={`/products?brand=${brand.id}`}
                              className="menu-link-text"
                            >
                              {brand.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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
        <Link href={`/products?sale=active`} className="item-link">
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
