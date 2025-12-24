"use client";

import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const sectionIds = [
  "general-use",
  "products-categories",
  "orders-payments",
  "delivery",
  "returns-refunds",
  "liability-disclaimer",
  "intellectual-property",
  "changes-to-terms",
  "contact-information",
];
const sections = [
  { id: 1, text: "General Use", scroll: "general-use" },
  { id: 2, text: "Products & Categories", scroll: "products-categories" },
  { id: 3, text: "Orders & Payments", scroll: "orders-payments" },
  { id: 4, text: "Delivery", scroll: "delivery" },
  { id: 5, text: "Returns & Refunds", scroll: "returns-refunds" },
  { id: 6, text: "Liability Disclaimer", scroll: "liability-disclaimer" },
  { id: 7, text: "Intellectual Property", scroll: "intellectual-property" },
  { id: 8, text: "Changes to Terms", scroll: "changes-to-terms" },
  { id: 9, text: "Contact Information", scroll: "contact-information" },
];

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    // Create an IntersectionObserver to track visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active section when the section is visible in the viewport
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px", // Trigger when section is 50% visible
      }
    );

    // Observe each section
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      // Cleanup the observer when the component unmounts
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleClick = (id) => {
    document
      .getElementById(id)
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="terms-of-use-wrap">
          <div className="left sticky-top">
            {sections.map(({ id, text, scroll, isActive }) => (
              <h6
                key={id}
                onClick={() => handleClick(scroll)}
                className={`btn-scroll-target ${activeSection == scroll ? "active" : ""
                  }`}
              >
                {id}. {text}
              </h6>
            ))}
          </div>
          <div className="right">
            <h4 className="heading">Terms & Conditions</h4>
            <p className="mb_40">By accessing or using the <span className="fw-6">SES Cosmetics</span> website, placing an order, or purchasing our products, you agree to the following Terms of Use.</p>
            <div className="terms-of-use-item item-scroll-target" id="general-use">
              <h5 className="terms-of-use-title">1. General Use</h5>
              <div className="terms-of-use-content">
                <ul className="list-text type-disc">
                  <li>
                    <p>All products sold by SES Cosmetics are intended for <span className="fw-6">external use only</span>, unless stated otherwise</p>
                  </li>
                  <li>
                    <p>Product results may vary depending on skin type, body suitability, other conditions, and usage</p>
                  </li>
                  <li>
                    <p>Customers are responsible for reading product descriptions, instructions, and ingredient lists before use</p>
                  </li>
                </ul>
                <p>We strongly recommend performing a <span className="fw-6">patch test</span> before using any skincare or cosmetic product.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="products-categories"
            >
              <h5 className="terms-of-use-title">2. Products & Categories</h5>
              <div className="terms-of-use-content">
                <p>SES Cosmetics offers products across multiple categories including:</p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Skincare (primary focus)</p>
                  </li>
                  <li>
                    <p>Haircare</p>
                  </li>
                  <li>
                    <p>Body care</p>
                  </li>
                  <li>
                    <p>Baby care</p>
                  </li>
                  <li>
                    <p>Personal hygiene and daily care products</p>
                  </li>
                </ul>
                <p>Product availability may change without notice.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="orders-payments"
            >
              <h5 className="terms-of-use-title">3. Orders & Payments</h5>
              <div className="terms-of-use-content">
                <ul className="list-text type-disc">
                  <li>
                    <p>All prices are listed in <span className="fw-6">Tanzanian Shillings (TZS) currency</span></p>
                  </li>
                  <li>
                    <p>Payment methods accepted include <span className="fw-6">Mobile Money & Cash</span></p>
                  </li>
                  <li>
                    <p>Out of Dar es Salaam orders are confirmed only after successful payment</p>
                  </li>
                  <li>
                    <p>SES Cosmetics reserves the right to cancel or refuse orders in cases of pricing errors, suspected fraud, stock unavailability or any other reason without any notice</p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="delivery"
            >
              <h5 className="terms-of-use-title">4. Delivery</h5>
              <div className="terms-of-use-content">
                <ul className="list-text type-disc">
                  <li>
                    <p>Delivery timelines provided are estimates and may vary based on location or circumstances</p>
                  </li>
                  <li>
                    <p>Customers are responsible for ensuring accurate delivery details</p>
                  </li>
                  <li>
                    <p>SES Cosmetics is not liable for delays caused by third-party couriers</p>
                  </li>
                </ul>
                <p>Customers must inspect their order <span className="fw-6">before completing payment for out of city orders and accepting delivery for within Dar es Salaam.</span></p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="returns-refunds"
            >
              <h5 className="terms-of-use-title">5. Returns & Refunds</h5>
              <div className="terms-of-use-content">
                <p>Due to hygiene and safety reasons, returns and exchanges are not accepted, except where the issue is on our end (incorrect, damaged, or missing items).</p>
                <p>Please refer to our <Link className="btn-line" href="/return-and-refund-policy">Returns & Refund Policy</Link> for full details.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="liability-disclaimer"
            >
              <h5 className="terms-of-use-title">6. Liability Disclaimer</h5>
              <div className="terms-of-use-content">
                <p>SES Cosmetics is not responsible for:</p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Allergic reactions, sensitivities, or adverse skin responses</p>
                  </li>
                  <li>
                    <p>Incorrect product use or failure to follow instructions</p>
                  </li>
                  <li>
                    <p>Individual product suitability</p>
                  </li>
                </ul>
                <p>Customers are encouraged to consult a professional where necessary.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="intellectual-property"
            >
              <h5 className="terms-of-use-title">7. Intellectual Property</h5>
              <div className="terms-of-use-content">
                <p>All content on this website—including text, images, logos, branding, and design—belongs to <span className="fw-6">SES Cosmetics</span> and may not be copied, reproduced, or used without written permission.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="changes-to-terms"
            >
              <h5 className="terms-of-use-title">8. Changes to Terms</h5>
              <div className="terms-of-use-content">
                <p>SES Cosmetics reserves the right to update or modify these Terms & Conditions at any time. Continued use of the website indicates acceptance of the updated terms.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="contact-information"
            >
              <h5 className="terms-of-use-title">9. Contact Information</h5>
              <div className="terms-of-use-content">
                <p>For any questions regarding these Terms & Conditions, please contact us at:</p>
                <p className="d-flex align-items-center gap-8"><MdOutlineEmail size={25} /><span className="fw-6">Email:</span> ses.tz@icloud.com</p>
                <p className="d-flex align-items-center gap-8"><FaWhatsapp size={25} /><span className="fw-6">Phone / WhatsApp</span> +255 710 071 612</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}