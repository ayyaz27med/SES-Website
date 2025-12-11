"use client";
import React, { useState } from "react";
import ContactForm from "../forms/ContactForm";
import ComplaintForm from "../forms/ComplaintForm";

export default function ContactTab() {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="widget-tabs style-1">
              <ul className="widget-menu-tab">
                <li
                  className={`item-title ${activeTab == 1 ? "active" : ""} `}
                  onClick={() => setActiveTab(1)}
                >
                  <span className="inner">Get In Touch</span>
                </li>
                <li
                  className={`item-title ${activeTab == 2 ? "active" : ""} `}
                  onClick={() => setActiveTab(2)}
                >
                  <span className="inner">Complaint</span>
                </li>
              </ul>
              <div className="widget-content-tab mb_60">
                <div
                  className={`widget-content-inner ${
                    activeTab == 1 ? "active" : ""
                  } `}
                >
                  <div className="">
                    <ContactForm />
                  </div>
                </div>
                <div
                  className={`widget-content-inner ${
                    activeTab == 2 ? "active" : ""
                  } `}
                >
                  <div className="tab-reviews write-cancel-review-wrap">
                    <ComplaintForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
