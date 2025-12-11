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
import useInstoreComplaint from "@/services/tanstack/mutations/useInstoreComplaint";

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required("Name is required"),
  mobileno: Yup.string().required("Mobile Number is required"),
  date_of_visit: Yup.string().required("Visit Date is required"),
  describe_issue: Yup.string().required("Describe Issue is required"),
});

export default function ComplaintForm() {
  const [mobileNo, setMobileNo] = useState("");
  const [dialCode, setDialCode] = useState("255");
  const [fileName, setFileName] = useState("");

  const { mutate: instoreComplaint, isPending: isLoading } = useInstoreComplaint({
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
          mobileno: "",
          mobileno_country_code: "255",
          date_of_visit: "",
          describe_issue: "",
          picture: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          instoreComplaint(values, {
            onSuccess: () => {
              resetForm();
              setMobileNo("");
              setFileName("");
              setDialCode("255");
            },
          });
        }}
      >
        {(formik) => {
          const error = formik.errors.mobileno;
          const touched = formik.touched.mobileno;
          return (
            <div
              className="form-leave-comment form-has-password form-login"
            >
              <div className="">
                <div className="tf-grid-layout md-col-2 sm-col-1 mb_30">
                  <FormikInput name="customer_name" placeholder="Name" />
                  <fieldset>
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
                        formik.setFieldValue("mobileno", raw);
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
                <div className="tf-grid-layout md-col-2 sm-col-1 mb_30">
                  <FormikInput name="date_of_visit" type="date" placeholder="Date" />
                  <div>
                    <fieldset className="">
                      <div className="file-picker">
                        <input
                          id="file"
                          type="file"
                          accept="image/*"
                          className="file-input"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              formik.setFieldValue("picture", file);
                              setFileName(file.name);
                            }
                          }}
                        />
                        <label htmlFor="file" className="file-label">
                          <svg width="16" height="16" aria-hidden>
                            <path d="M2 10v3h12v-3" fill="none" stroke="currentColor" />
                            <path d="M8 2v10" fill="none" stroke="currentColor" />
                            <path d="M5 5l3-3 3 3" fill="none" stroke="currentColor" />
                          </svg>
                          <span>{fileName || "Upload Receipt Image"}</span>
                        </label>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <fieldset className="mb_16">
                  <FormikTextArea
                    name="describe_issue"
                    placeholder="Describe Issue..."
                  />
                </fieldset>
              </div>
              <div className="button-submit send-wrap text-center">
                <button className="tf-btn btn-fill" type="submit" disabled={isLoading}>
                  <span className="text text-button">Submit</span>
                </button>
              </div>
            </div>
          )
        }}
      </FormikForm >
    </div >
  );
}
