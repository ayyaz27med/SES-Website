"use client";

import FormikForm from "./FormikForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  mobile_no: Yup.string().required("Mobile Number is required"),
});

export default function LoginForm({ onLoginOrRegister, isLoading }) {
  const [mobileNo, setMobileNo] = useState("");
  const [dialCode, setDialCode] = useState("255");

  return (
    <FormikForm
      initialValues={{
        mobile_no: "",
        mobile_country_code: "255",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => onLoginOrRegister(values)}
    >
      {(formik) => {
        const error = formik.errors.mobile_number;
        const touched = formik.touched.mobile_number;
        return (
          <div className="form-login form-has-password mt_10">
            <div className="wrap">
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

              <div className="d-flex align-items-center justify-content-center">
                <div className="tf-cart-checkbox rerr">
                  <div className="tf-checkbox-wrapp">
                    <input
                      defaultChecked
                      type="checkbox"
                      id="login-form_agree"
                      name="agree_checkbox"
                    />
                    <div>
                      <i className="icon-check" />
                    </div>
                  </div>
                  <label htmlFor="login-form_agree">Remember me</label>
                </div>
              </div>
            </div>

            <div className="button-submit">
              <button className="tf-btn btn-fill" type="submit" disabled={isLoading}>
                <span className="text text-button">Submit</span>
              </button>
            </div>
          </div>
        )
      }}
    </FormikForm>
  );
}
