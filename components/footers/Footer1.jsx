"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ToolbarBottom from "../headers/ToolbarBottom";
import { footerLinks, socialLinks } from "@/data/footerLinks";
import WhatsappButton from "../common/WhatsappButton";
export default function Footer1({
  border = true,
  dark = false,
  hasPaddingBottom = false,
}) {
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobile");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount
  return (
    <>
      <footer
        id="footer"
        className={`footer ${dark ? "bg-main" : ""} ${
          hasPaddingBottom ? "has-pb" : ""
        } `}
      >
        <div className={`footer-wrap ${!border ? "border-0" : ""}`}>
          <div className="footer-body">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="footer-infor">
                    <div className="footer-logo">
                      <Link href={`/`}>
                        <Image
                          alt=""
                          src={
                            dark
                              ? "/images/logo/logo.png"
                              : "/images/logo/logo.png"
                          }
                          width={65}
                          height={65}
                          // style={{ width: "auto", height: "auto" }}
                        />
                      </Link>
                    </div>
                    <div className="footer-address">
                      <p>1st Floor, Girls Guide Building, Kibasila St, Upanga - Dar es Salaam</p>
                      <Link
                        href={`/contact-02`}
                        className={`tf-btn-default fw-6 ${
                          dark ? "style-white" : ""
                        } `}
                      >
                        GET DIRECTION
                        <i className="icon-arrowUpRight" />
                      </Link>
                    </div>
                    <ul className="footer-info">
                      <li>
                        <i className="icon-mail" />
                        <p>ses.tz@icloud.com</p>
                      </li>
                      <li>
                        <i className="icon-phone" />
                        <p>+255 710 071 612</p>
                      </li>
                    </ul>
                    <ul
                      className={`tf-social-icon  ${
                        dark ? "style-white" : ""
                      } `}
                    >
                      {socialLinks.map((link, index) => (
                        <li key={index}>
                          <a href={link.href} className={link.className}>
                            <i className={`icon ${link.iconClass}`} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="footer-menu">
                    {footerLinks.map((section, sectionIndex) => (
                      <div className="footer-col-block" key={sectionIndex}>
                        <div className="footer-heading text-button footer-heading-mobile">
                          {section.heading}
                        </div>
                        <div className="tf-collapse-content">
                          <ul className="footer-menu-list">
                            {section.items.map((item, itemIndex) => (
                              <li className="text-caption-1" key={itemIndex}>
                                {item.isLink ? (
                                  <Link
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.href}
                                    className="footer-menu_item"
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="footer-bottom-wrap">
                    <div className="left">
                      <p className="text-caption-1">
                        © 2025 SES Cosmetics Tanzania. All Rights Reserved
                      </p>
                    </div>
                    <div className="tf-payment">
                      <p className="text-caption-1">We accept:</p>
                      <ul>
                        <li>
                          <Image
                            alt=""
                            src="/images/payment/cash.png"
                            width={100}
                            height={64}
                            className="rounded-1"
                          />
                        </li>
                        <li>
                          <Image
                            alt=""
                            src="/images/payment/Mpesa.png"
                            width={100}
                            height={64}
                            className="rounded-1"
                          />
                        </li>
                        <li>
                          <Image
                            alt=""
                            src="/images/payment/airtelmoney.png"
                            width={100}
                            height={64}
                            className="rounded-1"
                          />
                        </li>
                        <li>
                          <Image
                            alt=""
                            src="/images/payment/mixxbyyas.png"
                            width={98}
                            height={64}
                            className="rounded-1"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <WhatsappButton hasPaddingBottom={hasPaddingBottom} />
      <ToolbarBottom />
    </>
  );
}
