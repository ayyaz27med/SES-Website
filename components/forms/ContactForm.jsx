"use client";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import FormikForm from "./FormikForm";
import "react-phone-input-2/lib/style.css";
import useGetInTouch from "@/services/tanstack/mutations/useGetInTouch";
import ToastHelper from "@/helpers/toastHelper";
import FormikInput from "../common/FormikInput";
import * as Yup from "yup";
import FormikTextArea from "../common/FormikTextarea";

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Name is required"),
  message: Yup.string().required("Message is required"),
  mobile_no: Yup.string().required("Mobile Number is required"),
});

export default function ContactForm() {
  const [mobileNo, setMobileNo] = useState("");
  const [dialCode, setDialCode] = useState("255");

  const { mutate: getInTouch, isPending: isLoading } = useGetInTouch({
    onSuccess: async (data) => {
      ToastHelper.success(data?.message);
    },
    onError: (data) => {
      ToastHelper.error(data?.message);
    },
  });

  return (
    <div className="container">
      <FormikForm
        initialValues={{
          customer_name: "",
          mobile_no: "",
          mobile_country_code: "255",
          type: "contact",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          getInTouch(values, {
            onSuccess: () => {
              resetForm();
              setMobileNo("");
              setDialCode("255");
            },
          });
        }}
      >
        {(formik) => {
          const error = formik.errors.mobile_no;
          const touched = formik.touched.mobile_no;
          return (
            <div
              className="form-leave-comment form-has-password form-login"
            >
              <div className="wrap">
                <div className="cols">
                  <fieldset className="">
                    <FormikInput name="customer_name" placeholder="Name" />
                  </fieldset>
                  <fieldset className="">
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
                          formik.setFieldValue("mobile_country_code", dCode);

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
                        formik.setFieldValue("mobile_no", raw);
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
                    {error && touched && (
                      <div className="small" style={{ color: "red" }}>
                        {error}
                      </div>
                    )}
                  </fieldset>
                </div>
                <fieldset className="">
                  <FormikTextArea
                    name="message"
                    placeholder="Message..."
                  />
                </fieldset>
              </div>
              <div className="button-submit send-wrap text-center">
                <button className="tf-btn btn-fill" type="submit" disabled={isLoading}>
                  <span className="text text-button">Send message</span>
                </button>
              </div>
            </div>
          )
        }}
      </FormikForm >
    </div>
  );
}
