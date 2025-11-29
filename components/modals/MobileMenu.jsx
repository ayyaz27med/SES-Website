"use client";
import React from "react";
import Link from "next/link";
import {
  allAffordableBrandsLinks,
  allBrandsLinks1,
  allBrandsLinks2,
  allBrandsLinks3,
  babyAndChild1,
  babyAndChild2,
  babyAndChild3,
  blogLinks,
  categories1,
  categories2,
  categories3,
  fragrances,
  giftings,
  haircareConcerns,
  haircareHairType,
  haircareIngredients,
  haircareProductTypes,
  makeup1,
  makeup2,
  makeup3,
  sales,
  skinCareConcerns,
  skinCareHairType,
  skinCareIngredients,
  skinCareProductType,
  wellbeingIngredients,
  wellbeingProductTypes,
} from "@/data/menu";
import { usePathname } from "next/navigation";
import { useSession } from "@/store/session";
export default function MobileMenu() {
  const pathname = usePathname();
  const { isAuthenticated, clearSession } = useSession();
  const handleLogout = () => {
    clearSession();
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
                  className={`collapsed mb-menu-link ${
                    [
                      ...allBrandsLinks1,
                      ...allBrandsLinks2,
                      ...allBrandsLinks3,
                      ...allAffordableBrandsLinks,
                    ].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-one"
                >
                  <span>Brands</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-one" className="collapse">
                  <ul className="sub-nav-menu">
                    {[
                      ...allBrandsLinks1,
                      ...allBrandsLinks2,
                      ...allBrandsLinks3,
                      ...allAffordableBrandsLinks,
                    ].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              {/* <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-two"
                  className={`collapsed mb-menu-link ${
                    [
                      ...shopLayout,
                      ...shopFeatures,
                      ...productStyles,
                      ...otherShopMenus,
                    ].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-two"
                >
                  <span>Shop</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-two" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <a
                        href="#sub-shop-one"
                        className={`sub-nav-link collapsed ${
                          [...shopLayout].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-one"
                      >
                        <span>Shop layout</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-one" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {shopLayout.map((link, i) => (
                            <li key={i}>
                              <Link
                                href={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-two"
                        className={`sub-nav-link collapsed ${
                          [...shopFeatures].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-two"
                      >
                        <span>Shop Features</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-two" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {shopFeatures.map((link, i) => (
                            <li key={i}>
                              <Link
                                href={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-three"
                        className={`sub-nav-link collapsed ${
                          [...productStyles].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-three"
                      >
                        <span>Products Hover</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-three" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {productStyles.map((link, i) => (
                            <li key={i}>
                              <Link
                                href={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-four"
                        className={`sub-nav-link collapsed ${
                          [...otherShopMenus].some(
                            (elm) =>
                              elm.href.split("/")[1] == pathname.split("/")[1]
                          )
                            ? "active"
                            : ""
                        } `}
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-four"
                      >
                        <span>My Pages</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-four" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          {otherShopMenus.map((link, i) => (
                            <li key={i}>
                              <Link
                                href={link.href}
                                className={`sub-nav-link ${
                                  pathname.split("/")[1] ==
                                  link.href.split("/")[1]
                                    ? "active"
                                    : ""
                                } `}
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li> */}
              <li className="nav-mb-item active">
                <a
                  href="#dropdown-menu-two"
                  className={`collapsed mb-menu-link ${
                    [...categories1, ...categories2, ...categories3].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-two"
                >
                  <span>Categories</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-two" className="collapse">
                  <ul className="sub-nav-menu">
                    {[...categories1, ...categories2, ...categories3].map(
                      (link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className={`sub-nav-link ${
                              pathname.split("/")[1] == link.href.split("/")[1]
                                ? "active"
                                : ""
                            } `}
                          >
                            {link.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-three"
                  className={`collapsed mb-menu-link ${
                    [
                      ...skinCareProductType,
                      ...skinCareConcerns,
                      ...skinCareHairType,
                      ...skinCareIngredients,
                    ].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-three"
                >
                  <span>Skin Care</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-three" className="collapse">
                  <ul className="sub-nav-menu">
                    {[
                      ...skinCareProductType,
                      ...skinCareConcerns,
                      ...skinCareHairType,
                      ...skinCareIngredients,
                    ].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-four"
                  className={`collapsed mb-menu-link ${
                    [
                      ...skinCareProductType,
                      ...skinCareConcerns,
                      ...skinCareHairType,
                      ...skinCareIngredients,
                      ...wellbeingIngredients,
                      ...wellbeingProductTypes,
                    ].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-four"
                >
                  <span>Body & Wellbeing</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-four" className="collapse">
                  <ul className="sub-nav-menu">
                    {[
                      ...skinCareProductType,
                      ...skinCareConcerns,
                      ...skinCareHairType,
                      ...skinCareIngredients,
                      ...wellbeingIngredients,
                      ...wellbeingProductTypes,
                    ].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-five"
                  className={`collapsed mb-menu-link ${
                    [
                      ...haircareProductTypes,
                      ...haircareConcerns,
                      ...haircareHairType,
                      ...haircareIngredients,
                    ].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-five"
                >
                  <span>Haircare</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-five" className="collapse">
                  <ul className="sub-nav-menu">
                    {[
                      ...haircareProductTypes,
                      ...haircareConcerns,
                      ...haircareHairType,
                      ...haircareIngredients,
                    ].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-six"
                  className={`collapsed mb-menu-link ${
                    [...makeup1, ...makeup2, ...makeup3].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-six"
                >
                  <span>Makeup</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-six" className="collapse">
                  <ul className="sub-nav-menu">
                    {[...makeup1, ...makeup2, ...makeup3].map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-seven"
                  className={`collapsed mb-menu-link ${
                    [...babyAndChild1, ...babyAndChild2, ...babyAndChild3].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-seven"
                >
                  <span>Baby & Child</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-seven" className="collapse">
                  <ul className="sub-nav-menu">
                    {[...babyAndChild1, ...babyAndChild2, ...babyAndChild3].map(
                      (link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className={`sub-nav-link ${
                              pathname.split("/")[1] == link.href.split("/")[1]
                                ? "active"
                                : ""
                            } `}
                          >
                            {link.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-eight"
                  className={`collapsed mb-menu-link ${
                    [...fragrances].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-eight"
                >
                  <span>Fragrance</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-eight" className="collapse">
                  <ul className="sub-nav-menu">
                    {fragrances.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-nine"
                  className={`collapsed mb-menu-link ${
                    [...giftings].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-nine"
                >
                  <span>Gifting</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-nine" className="collapse">
                  <ul className="sub-nav-menu">
                    {giftings.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-ten"
                  className={`collapsed mb-menu-link ${
                    [...sales].some(
                      (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
                    )
                      ? "active"
                      : ""
                  } `}
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-ten"
                >
                  <span>Sale</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-ten" className="collapse">
                  <ul className="sub-nav-menu">
                    {sales.map((link, i) => (
                      <li key={i}>
                        <Link
                          href={link.href}
                          className={`sub-nav-link ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
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
              <Link href={`/contact`} className="text-need">
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
