"use client";

import { useEffect, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";

const sectionIds = [
  "information-we-collect",
  "how-we-use-your-information",
  "data-protection-security",
  "cookies",
  "your-consent",
  "contact-us",
];
const sections = [
  { id: 1, text: "Information We Collect", scroll: "information-we-collect" },
  { id: 2, text: "How We Use Your Information", scroll: "how-we-use-your-information" },
  { id: 3, text: "Data Protection & Security", scroll: "data-protection-security" },
  { id: 4, text: "Cookies", scroll: "cookies" },
  { id: 5, text: "Your Consent", scroll: "your-consent" },
  { id: 6, text: "Contact Us", scroll: "contact-us" },
];

export default function PrivacyPolicy() {
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
            <h4 className="heading">Privacy Policy</h4>
            <p className="mb_40">At <span className="fw-6">SES Cosmetics</span>, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you interact with our website, store, or services.</p>
            <div className="terms-of-use-item item-scroll-target" id="information-we-collect">
              <h5 className="terms-of-use-title">1. Information We Collect</h5>
              <div className="terms-of-use-content">
                <p>We may collect the following information when you place an order, contact us, or use our website:</p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Full name</p>
                  </li>
                  <li>
                    <p>Phone number</p>
                  </li>
                  <li>
                    <p>Email address</p>
                  </li>
                  <li>
                    <p>Delivery or billing address</p>
                  </li>
                  <li>
                    <p>Order details and purchase history</p>
                  </li>
                  <li>
                    <p>Payment-related information (processed via third-party providers)</p>
                  </li>
                  <li>
                    <p>Any information you voluntarily provide through forms, messages, or customer support</p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="how-we-use-your-information"
            >
              <h5 className="terms-of-use-title">2. How We Use Your Information</h5>
              <div className="terms-of-use-content">
                <p>Your information is used strictly to:</p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Process and deliver your orders</p>
                  </li>
                  <li>
                    <p>Communicate order updates and customer support</p>
                  </li>
                  <li>
                    <p>Improve our products, services, and customer experience</p>
                  </li>
                  <li>
                    <p>Provide skincare guidance or product recommendations when requested</p>
                  </li>
                  <li>
                    <p>Send promotional messages or offers (only if you have opted in)</p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="data-protection-security"
            >
              <h5 className="terms-of-use-title">3. Data Protection & Security</h5>
              <div className="terms-of-use-content">
                <p>We take reasonable and appropriate measures to protect your personal data from unauthorized access, misuse, loss, or disclosure. Your information is <span className="fw-6">never sold or rented</span> to third parties.</p>
                <p>We may share limited information only when necessary to:</p>
                <ul className="list-text type-disc">
                  <li>
                    <p>Complete deliveries</p>
                  </li>
                  <li>
                    <p>Process payments</p>
                  </li>
                  <li>
                    <p>Comply with legal or regulatory requirements</p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="cookies"
            >
              <h5 className="terms-of-use-title">4. Cookies</h5>
              <div className="terms-of-use-content">
                <p>Our website may use cookies or similar technologies to improve functionality, analyze traffic, and enhance user experience. You may choose to disable cookies through your browser settings.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="your-consent"
            >
              <h5 className="terms-of-use-title">5. Your Consent</h5>
              <div className="terms-of-use-content">
                <p>By using our website or services, you consent to the collection and use of your information in accordance with this Privacy Policy.</p>
              </div>
            </div>
            <div
              className="terms-of-use-item item-scroll-target"
              id="contact-us"
            >
              <h5 className="terms-of-use-title">6. Contact Us</h5>
              <div className="terms-of-use-content">
                <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
                <p className="d-flex align-items-center gap-8"><MdOutlineEmail size={25} /><span className="fw-6">Email:</span> ses.tz@icloud.com</p>
                <p className="d-flex align-items-center gap-8"><FaWhatsapp size={25} /><span className="fw-6">Phone / WhatsApp</span> +255 710 071 612</p>
                <p className="d-flex align-items-center gap-8"><GrLocation size={25} /><span className="fw-6">Location:</span> 1st Floor, Girls Guide Building, Kibasila St, Upanga - Dar es Salaam</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}