"use client";
import useFaqs from "@/services/tanstack/queries/useFaqs";
import React, { useState } from "react";
import FormikForm from "../forms/FormikForm";
import * as Yup from "yup";
import FormikInput from "../common/FormikInput";
import FormikTextArea from "../common/FormikTextarea";
import Label from "../common/Label";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import useGetInTouch from "@/services/tanstack/mutations/useGetInTouch";
import ToastHelper from "@/helpers/toastHelper";
import { useSession } from "@/store/session";

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Name is required"),
  message: Yup.string().required("Message is required"),
  mobile_number: Yup.string().required("Mobile Number is required"),
  title: Yup.string().required("Please select how we can help you"),
});

export default function Faqs() {
  const { user } = useSession()
  const [mobileNo, setMobileNo] = useState( user?.mobile_no || "");
  const [dialCode, setDialCode] = useState(user?.mobile_country_code || "255");

  const { data } = useFaqs({
    isServerSidePagination: true,
  });
  const faqs = data?.data || []

  const { mutate: getInTouch } = useGetInTouch({
    onSuccess: async (data) => {
      ToastHelper.success(data?.message);
    },
    onError: (data) => {
      ToastHelper.error(data?.message);
    },
  });

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
              <FormikForm
                initialValues={{
                  customer_name: user?.name || "",
                  mobile_number: user?.mobile_no || "",
                  mobile_country_code: user?.mobile_country_code || "255",
                  type: "faq",
                  title: "",
                  message: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  const { title, message, ...oldValues } = values;
                  const updatedValues = {
                    ...oldValues,
                    message: `${title}: ${message}`,
                  };
                  getInTouch(updatedValues, {
                    onSuccess: () => {
                      resetForm();
                      setMobileNo("");
                      setDialCode("255");
                    },
                  });
                }}
              >
                {(formik) => {
                  const mobile_number_error = formik.errors.mobile_number;
                  const mobile_number_touched = formik.touched.mobile_number;
                  const title_error = formik.errors.title;
                  const title_touched = formik.touched.title;
                  return (
                    <div className="d-flex flex-column gap-12">
                      <FormikInput name="customer_name" placeholder="Name" label="Name" />
                      <fieldset className="login-wrap d-block text-start">
                        <Label label={'Phone'} />
                        <PhoneInput
                          country={"tz"}
                          enableSearch={true}
                          disableFormatting={true}
                          disableDropdown={false}
                          disableSearchIcon={true}
                          value={`${dialCode}${mobileNo}`}
                          onChange={(value, country) => {
                            const dCode = country?.dialCode || "";
                            let raw = value.replace(/\D/g, "");

                            if (dCode !== dialCode) {
                              setDialCode(dCode);
                              formik.setFieldValue("mobileno_country_code", dCode);

                              raw = raw.replace(dCode, "");
                            }
                            if (raw.startsWith(dCode)) {
                              raw = raw.slice(dCode.length);
                            }
                            raw = raw.replace(/^0+/, "");
                            if (dCode === "255") {
                              raw = raw.slice(0, 9);
                            }

                            setMobileNo(raw);
                            formik.setFieldValue("mobile_number", raw);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") return;
                            if (!/^[0-9]$/.test(e.key)) {
                              e.preventDefault();
                              return;
                            }
                            if (e.key === "0" && mobileNo.length === 0) {
                              e.preventDefault();
                              return;
                            }
                            if (dialCode === "255" && mobileNo.length >= 9) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {mobile_number_error && mobile_number_touched && (
                          <div className="small" style={{ color: "red" }}>
                            {mobile_number_error}
                          </div>
                        )}
                      </fieldset>

                      <fieldset>
                        <Label label={'How can we help you?'} />
                        <div className="tf-select">
                          <select
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                          >
                            <option value="">Select Option</option>
                            {faqs?.map((faq) => (
                              <option key={faq?.id} value={faq.title}>{faq.title}</option>
                            ))}
                            <option value={'Other'}>Other</option>
                          </select>
                          {title_error && title_touched && (
                            <div className="small" style={{ color: "red" }}>
                              {title_error}
                            </div>
                          )}
                        </div>
                      </fieldset>
                      <fieldset className="mb_16">
                        <FormikTextArea
                          name="message"
                          placeholder="Describe Issue..."
                          label="Describe Issue"
                        />
                      </fieldset>
                      <div className="button-submit">
                        <button className="btn-style-2 w-100" type="submit">
                          <span className="text text-button">Send Request</span>
                        </button>
                      </div>
                    </div>
                  )
                }}
              </FormikForm >
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
