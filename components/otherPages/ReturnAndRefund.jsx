"use client";

import { useEffect, useState } from "react";

const sectionIds = [
  "no-returns-exchanges",
  "exceptions",
  "important-notes",
];
const sections = [
  { id: 1, text: "No Returns or Exchanges", scroll: "no-returns-exchanges" },
  { id: 2, text: "Exceptions (Our Error)", scroll: "exceptions" },
  { id: 3, text: "Important Notes", scroll: "important-notes" },
];

export default function ReturnAndRefund() {
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
            <h4 className="heading">Return & Refund Policy</h4>
            <p className="mb_40">At <span className="fw-6">SES Cosmetics</span>, the safety, hygiene, and satisfaction of our customers are extremely important to us.</p>
            <div className="terms-of-use-item item-scroll-target" id="no-returns-exchanges">
              <h5 className="terms-of-use-title">1. No Returns or Exchanges</h5>
              <div className="terms-of-use-content">
                <p>
                  Due to <span className="fw-6">hygiene and safety reasons</span>, we <span className="fw-6">do not offer returns or exchanges</span> on our products. This policy ensures that every customer receives <span className="fw-6">new, unused, and untampered products</span> at all times.
                </p>
                <p>
                  We strongly advise all customers to <span className="fw-6">carefully inspect their order before completing payment and accepting delivery.</span> Once payment is made and our delivery team has departed, we are unable to facilitate changes, returns, or exchanges.
                </p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="exceptions"
            >
              <h5 className="terms-of-use-title">2. Exceptions (Our Error)</h5>
              <div className="terms-of-use-content">
                <p>
                  Returns or exchanges are <span className="fw-6">only accepted if the issue is on our end</span>, such as:
                </p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Incorrect product delivered</p>
                  </li>
                  <li>
                    <p>Damaged product at the time of delivery</p>
                  </li>
                  <li>
                    <p>Missing items from the order</p>
                  </li>
                </ul>
                <p>
                  In such cases:
                </p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Customers must notify us <span className="fw-6">immediately upon delivery.</span></p>
                  </li>
                  <li>
                    <p>Proof such as photos or videos may be requested</p>
                  </li>
                  <li>
                    <p>Returned items are <span className="fw-6">discarded and never resold</span>, in line with our hygiene standards</p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="important-notes"
            >
              <h5 className="terms-of-use-title">3. Important Notes</h5>
              <div className="terms-of-use-content">
                <p>
                  In such cases:
                </p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Opened or used products are <span className="fw-6">strictly non-returnable.</span></p>
                  </li>
                  <li>
                    <p>Allergic reactions or product incompatibility are not grounds for return</p>
                  </li>
                  <li>
                    <p>We recommend performing a <span className="fw-6">patch test</span> before using any skincare or cosmetic product</p>
                  </li>
                </ul>
              </div>
            </div>
            <p className="py_20">For any concerns regarding your order, please contact us at <span className="fw-6">+255 710 071 612.</span></p>
            <p>Thank you for your understanding and continued trust in <span className="fw-6">SES Cosmetics ♥️</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
