"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function About() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="flat-spacing about-us-main pb_0">
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <div className="about-us-features wow fadeInLeft">
              <Image
                className="lazyload"
                data-src="/images/logo/logo.png"
                alt="image-team"
                src="/images/logo/logo.png"
                width={400}
                height={500}
                style={{ maxHeight: 500 }}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="about-us-content">
              <h3 className="title wow fadeInUp">
                About SES
              </h3>
              <div className="widget-tabs style-3">
                <ul className="widget-menu-tab wow fadeInUp">
                  <li
                    className={`item-title ${activeTab == 1 ? "active" : ""} `}
                    onClick={() => setActiveTab(1)}
                  >
                    <span className="inner text-button">Introduction</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 2 ? "active" : ""} `}
                    onClick={() => setActiveTab(2)}
                  >
                    <span className="inner text-button">Our Vision</span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 3 ? "active" : ""} `}
                    onClick={() => setActiveTab(3)}
                  >
                    <span className="inner text-button">
                      What Sets Us Apart
                    </span>
                  </li>
                  <li
                    className={`item-title ${activeTab == 4 ? "active" : ""} `}
                    onClick={() => setActiveTab(4)}
                  >
                    <span className="inner text-button">Our Commitment</span>
                  </li>
                </ul>
                <div className="widget-content-tab wow fadeInUp">
                  <div
                    className={`widget-content-inner ${activeTab == 1 ? "active" : ""
                      } `}
                  >
                    <p>
                      SES Cosmetics is a Tanzanian beauty and personal care brand dedicated to providing high-quality skincare, alongside carefully selected haircare, body care, baby care, personal hygiene, and essential daily care products—all tailored to real needs.
                    </p>
                    <p className="mt_8">
                      We serve customers both online and in-store, offering trusted products that support healthy skin, body care, and everyday wellness across Tanzania.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${activeTab == 2 ? "active" : ""
                      } `}
                  >
                    <p>
                      Our vision is to become a trusted destination for skincare and personal care solutions in Tanzania—where customers can find authentic products, reliable guidance, and long-term care for their skin and bodies.
                    </p>
                    <p className="mt_8">
                      We aim to empower our community with the right knowledge and products to build consistent routines that promote healthy skin, confidence, and overall well-being.
                    </p>
                  </div>
                  <div
                    className={`widget-content-inner ${activeTab == 3 ? "active" : ""
                      } `}
                  >
                    <p>
                      At SES Cosmetics, we go beyond selling products. We carefully curate items that address real concerns such as acne, hyperpigmentation, dryness, sensitivity, uneven skin tone, and overall skin health, while also supporting daily hair, body, baby, and hygiene needs.
                    </p>
                    <div className="text body-text-1 text-secondary py_15">We focus on:</div>
                    <ul className="list-text type-disc">
                      <li>
                        <p>Thoughtfully selected, authentic products</p>
                      </li>
                      <li>
                        <p>Clear guidance on proper usage and routines</p>
                      </li>
                      <li>
                        <p>A strong emphasis on skincare education</p>
                      </li>
                      <li>
                        <p>Honest recommendations based on real needs</p>
                      </li>
                    </ul>
                  </div>
                  <div
                    className={`widget-content-inner ${activeTab == 4 ? "active" : ""
                      } `}
                  >
                    <p>
                      We are committed to quality, transparency, and customer satisfaction. Every product we offer is selected with care, and we prioritize hygiene, safety, and responsible guidance—especially in skincare.
                    </p>
                    <p className="mt_8">
                      Whether you are starting your skincare journey, maintaining healthy skin, or caring for yourself and your family, SES Cosmetics is here to support you every step of the way.
                    </p>
                  </div>
                </div>
              </div>
              {/* <a href="#" className="tf-btn btn-fill wow fadeInUp">
                <span className="text text-button">Read More</span>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
