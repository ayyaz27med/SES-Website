"use client";
import { allAffordableBrandsLinks, allBrandsLinks1, allBrandsLinks2, allBrandsLinks3, babyAndChild1, babyAndChild2, babyAndChild3, categories1, categories2, categories3, fragrances, giftings, haircareConcerns, haircareHairType, haircareIngredients, haircareProductTypes, makeup1, makeup2, makeup3, sales, skinCareConcerns, skinCareHairType, skinCareIngredients, skinCareProductType, wellbeingIngredients, wellbeingProductTypes } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {" "}
      <li className="menu-item">
        <Link href='/' className="item-link">
        Home
        </Link>
      </li>
      <li
        className={`menu-item ${
          [...allBrandsLinks1, ...allBrandsLinks2, ...allBrandsLinks3, ...allAffordableBrandsLinks].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
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
              <div className="col-lg-6">
                <div className="mega-menu-item">
                  <Link href={'/'} className="menu-heading text-decoration-underline">View All Brands</Link>
                  <div className="row gap-16">
                    <ul className="menu-list col">
                      {allBrandsLinks1.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="menu-list col">
                      {allBrandsLinks2.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="menu-list col">
                      {allBrandsLinks3.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="mega-menu-item">
                  <div className="menu-heading">Affordable Brands</div>
                  <div className="row gap-16">
                    <ul className="menu-list col">
                      {allAffordableBrandsLinks.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...categories1, ...categories2, ...categories3].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Categories
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Categories</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  {categories1.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  {categories2.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  {categories3.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...skinCareProductType, ...skinCareConcerns, ...skinCareHairType, ...skinCareIngredients].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Skin Care
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Skin Care</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  <li className="menu-heading">Product Type</li>
                  {skinCareProductType.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  <li className="menu-heading">Concerns</li>
                  {skinCareConcerns.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  <li className="menu-heading">Hair Type</li>
                  {skinCareHairType.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  <li className="menu-heading">Ingredients</li>
                  {skinCareIngredients.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...skinCareProductType, ...skinCareConcerns, ...skinCareHairType, ...skinCareIngredients, ...wellbeingIngredients, ...wellbeingProductTypes].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Body & Wellbeing
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <div className="row">
                <div className="col-6">
                  <h6 className="text text-center mb_8">Bodycare</h6>
                  <Link href={'/'} className="menu-heading text-decoration-underline">View All Bodycare</Link>
                  <div className="row gap-16">
                    <ul className="menu-list col">
                      <li className="menu-heading">Product Type</li>
                      {skinCareProductType.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="menu-list col">
                      <li className="menu-heading">Concerns</li>
                      {skinCareConcerns.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="menu-list col">
                      <li className="menu-heading">Hair Type</li>
                      {skinCareHairType.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text text-center mb_8">Wellbeing</h6>
                  <Link href={'/'} className="menu-heading text-decoration-underline">View All Wellbeing</Link>
                  <div className="row gap-16">
                    <ul className="menu-list col">
                      <li className="menu-heading">Product Type</li>
                      {wellbeingProductTypes.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="menu-list col">
                      <li className="menu-heading">Concerns</li>
                      {wellbeingIngredients.map((link, index) => (
                        <li
                          key={index}
                          className={`menu-item-li ${
                            pathname.split("/")[1] == link.href.split("/")[1]
                              ? "active"
                              : ""
                          } `}
                        >
                          <Link href={link.href} className="menu-link-text">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...haircareProductTypes, ...haircareConcerns, ...haircareHairType, ...haircareIngredients].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Haircare
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Categories</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  <li className="menu-heading">Product Type</li>
                  {haircareProductTypes.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  <li className="menu-heading">Concerns</li>
                  {haircareConcerns.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  <li className="menu-heading">Hair Type</li>
                  {haircareHairType.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  <li className="menu-heading">Ingredients</li>
                  {haircareIngredients.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...makeup1, ...makeup2, ...makeup3].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Makeup
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Makeup</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  {makeup1.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  {makeup2.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  {makeup3.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...babyAndChild1, ...babyAndChild2, ...babyAndChild3].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Baby & Child
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Baby & Child</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  {babyAndChild1.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  {babyAndChild2.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="menu-list col">
                  {babyAndChild3.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...fragrances].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Fragrance
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Fragrance</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  {fragrances.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...giftings].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Gifting
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Gifting</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  {giftings.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li
        className={`menu-item ${
          [...fragrances].some(
            (elm) => elm.href.split("/")[1] == pathname.split("/")[1]
          )
            ? "active"
            : ""
        } `}
      >
        <div href="#" className="item-link">
        Sale
          <i className="icon icon-arrow-down" />
        </div>
        <div className="sub-menu mega-menu">
          <div className="container">
            <div className="mega-menu-item">
              <Link href={'/'} className="menu-heading text-decoration-underline">View All Sale</Link>
              <div className="row gap-16">
                <ul className="menu-list col">
                  {sales.map((link, index) => (
                    <li
                      key={index}
                      className={`menu-item-li ${
                        pathname.split("/")[1] == link.href.split("/")[1]
                          ? "active"
                          : ""
                      } `}
                    >
                      <Link href={link.href} className="menu-link-text">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <Link href="/blog-list" className="item-link">
        Blog
        </Link>
      </li>
    </>
  );
}
