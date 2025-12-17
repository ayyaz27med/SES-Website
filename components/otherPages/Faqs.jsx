"use client";
import useFaqs from "@/services/tanstack/queries/useFaqs";
import React from "react";

export default function Faqs() {
  const { data } = useFaqs({
    isServerSidePagination: true,
  });
  const faqs = data?.data || []

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="page-faqs-wrap">
          <div className="list-faqs">
            {faqs?.map((faqGroup, groupIndex) => (
              <div key={faqGroup.id}>
                <h5 className="faqs-title">{faqGroup.title}</h5>

                <ul
                  className="accordion-product-wrap style-faqs"
                  id={`accordion-faq-${groupIndex}`}
                >
                  {faqGroup.faqs?.map((faq, faqIndex) => {
                    const collapseId = `accordion-${groupIndex}-${faqIndex}`;

                    return (
                      <li className="accordion-product-item" key={faq.id}>
                        <a
                          href={`#${collapseId}`}
                          className={`accordion-title ${faqIndex === 0 ? "" : "collapsed"
                            }`}
                          data-bs-toggle="collapse"
                          aria-expanded={faqIndex === 0}
                          aria-controls={collapseId}
                        >
                          <h6>{faq.question}</h6>
                          <span className="btn-open-sub" />
                        </a>

                        <div
                          id={collapseId}
                          className={`collapse ${faqIndex === 0 ? "show" : ""}`}
                          data-bs-parent={`#accordion-faq-${groupIndex}`}
                        >
                          <div className="accordion-faqs-content">
                            <p className="text-secondary">{faq.answer}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="ask-question sticky-top">
            <div className="ask-question-wrap">
              <h5 className="mb_4">Ask Your Question</h5>
              <p className="mb_20 text-secondary">
                Ask Anything, We're Here to Help
              </p>
              <form
                className="form-leave-comment"
                onSubmit={(e) => e.preventDefault()}
              >
                <fieldset className="mb_20">
                  <div className="text-caption-1 mb_8">Name</div>
                  <input
                    className=""
                    type="text"
                    placeholder="Your Name*"
                    name="text"
                    tabIndex={2}
                    defaultValue=""
                    aria-required="true"
                    required
                  />
                </fieldset>
                <fieldset className="mb_20">
                  <div className="text-caption-1 mb_8">
                    How can we help you?
                  </div>
                  <div className="tf-select">
                    <select className="">
                      <option>Exchanges &amp; Returns</option>
                      <option>Other</option>
                    </select>
                  </div>
                </fieldset>
                <fieldset className="mb_20">
                  <div className="text-caption-1 mb_8">Name</div>
                  <textarea
                    className=""
                    rows={4}
                    placeholder="Your Message*"
                    tabIndex={2}
                    aria-required="true"
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="button-submit">
                  <button className="btn-style-2 w-100" type="submit">
                    <span className="text text-button">Send Request</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
