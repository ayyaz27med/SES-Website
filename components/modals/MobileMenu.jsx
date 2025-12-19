"use client";
import React from "react";
import Link from "next/link";
import { useSession } from "@/store/session";
import useCategories from "@/services/tanstack/queries/useCategories";
import MobileNavbarItem from "../headers/MobileNavbarItem";
import ToastHelper from "@/helpers/toastHelper";
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

export default function MobileMenu() {
  const { isAuthenticated, clearSession } = useSession();

  const { data: brandsGroupData } = useBrandsGroup({
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

  const handleLogout = () => {
    clearSession();
    ToastHelper.success("Logout Successful");
  };

  return (
    <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
      <span
        className="icon-close icon-close-popup"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      />
      <div className="mb-canvas-content">
        <div className="mb-body">
          <div className="mb-content-top">
            <form className="form-search" onSubmit={(e) => e.preventDefault()}>
              <fieldset className="text">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className=""
                  name="text"
                  tabIndex={0}
                  defaultValue=""
                  aria-required="true"
                  required
                />
              </fieldset>
              <button className="" type="submit">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.9984 20.9999L16.6484 16.6499"
                    stroke="#181818"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <li className="nav-mb-item">
                <Link href="/" className="mb-menu-link">
                  Home
                </Link>
              </li>
              <li className="nav-mb-item active">
                <a
                  href="#dropdown-menu-one"
                  className="collapsed mb-menu-link"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-one"
                >
                  <span>Brands</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-one" className="collapse">
                  <Link
                    href="/products"
                    className="menu-heading text-decoration-underline sub-nav-link fw-6 pl_4"
                  >
                    View All Brands
                  </Link>
                  {brandGroups.map((section) => {
                    return (
                      <ul className="sub-nav-menu" key={section?.id}>
                        <li className="sub-nav-link fw-6">{section.name}</li>
                        {section?.brands.map((item) => {
                          return (
                            <li key={item.id}>
                              <Link
                                href={`/products?brand=${item?.id}`}
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

              {!isCategoriesLoading &&
                sortedCategories.map((category) => {
                  return <MobileNavbarItem category={category} key={category?.id} />;
                })}
              <li className="nav-mb-item">
                <Link href={`/products?sale=active`} className="mb-menu-link">
                  Sale
                </Link>
              </li>
              <li className="nav-mb-item">
                <Link href="/blog-list" className="mb-menu-link">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="mb-other-content">
            <div className="group-icon">
              <Link href={`/wish-list`} className="site-nav-icon">
                <svg
                  className="icon"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.8401 4.60987C20.3294 4.09888 19.7229 3.69352 19.0555 3.41696C18.388 3.14039 17.6726 2.99805 16.9501 2.99805C16.2276 2.99805 15.5122 3.14039 14.8448 3.41696C14.1773 3.69352 13.5709 4.09888 13.0601 4.60987L12.0001 5.66987L10.9401 4.60987C9.90843 3.57818 8.50915 2.99858 7.05012 2.99858C5.59109 2.99858 4.19181 3.57818 3.16012 4.60987C2.12843 5.64156 1.54883 7.04084 1.54883 8.49987C1.54883 9.95891 2.12843 11.3582 3.16012 12.3899L4.22012 13.4499L12.0001 21.2299L19.7801 13.4499L20.8401 12.3899C21.3511 11.8791 21.7565 11.2727 22.033 10.6052C22.3096 9.93777 22.4519 9.22236 22.4519 8.49987C22.4519 7.77738 22.3096 7.06198 22.033 6.39452C21.7565 5.72706 21.3511 5.12063 20.8401 4.60987V4.60987Z"
                    stroke="#181818"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Wishlist
              </Link>
              {isAuthenticated ? (
                <div className="d-flex gap-12">
                  <Link href={`/my-account`} className="site-nav-icon">
                    <svg
                      className="icon"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="#181818"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="#181818"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    My Account
                  </Link>
                  <div className="site-nav-icon" onClick={handleLogout}>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                        stroke="#181818"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 17L21 12L16 7"
                        stroke="#181818"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21 12H9"
                        stroke="#181818"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Logout
                  </div>
                </div>
              ) : (
                <Link href={`/login`} className="site-nav-icon">
                  <svg
                    className="icon"
                    width={18}
                    height={18}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                      stroke="#181818"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Login / Register
                </Link>
              )}
            </div>
            <div className="mb-notice">
              <Link href={`/contact-02`} className="text-need">
                Need Help?
              </Link>
            </div>
            <div className="mb-contact">
              <p className="text-caption-1">
                1st Floor, Girls Guide Building, Kibasila St, Upanga - Dar es
                Salaam
              </p>
              <Link
                href={`/contact-02`}
                className="tf-btn-default text-btn-uppercase"
              >
                GET DIRECTION
                <i className="icon-arrowUpRight" />
              </Link>
            </div>
            <ul className="mb-info">
              <li>
                <i className="icon icon-mail" />
                <p>ses.tz@icloud.com</p>
              </li>
              <li>
                <i className="icon icon-phone" />
                <p>+255 710 071 612</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
