"use client";
import FormikForm from "./FormikForm";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

export default function LoginForm({ onLoginOrRegister, isLoading }) {
  return (
    <FormikForm
      initialValues={{
        mobile_no: "",
        mobile_country_code: "",
      }}
      onSubmit={(values) => onLoginOrRegister(values)}
    >
      {(formik) => {
        // FINAL controlled value for PhoneInput
        const phoneValue =
          (formik.values.mobile_country_code || "") +
          (formik.values.mobile_no || "");

        return (
          <div className="form-login form-has-password mt_10">
            <div className="wrap">
              <fieldset>
                <PhoneInput
                  country={"tz"}
                  enableSearch={true}
                  disableFormatting={true}
                  value={phoneValue}
                  disableCountryCode={false}
                  disableDropdown={false}
                  disableSearchIcon={true}
                  onChange={(value, data) => {
                    let raw = (value || "").replace(/\D/g, "");
                    const dial = String(data?.dialCode || "");
                    let digits = raw.startsWith(dial) ? raw.slice(dial.length) : raw;
                    // Remove leading zeros
                    digits = digits.replace(/^0+/, "");

                    if (data?.countryCode?.toLowerCase() === "tz") {
                      digits = digits.slice(0, 9);
                    }
                    formik.setFieldValue("mobile_country_code", dial);
                    formik.setFieldValue("mobile_no", digits);
                  }}
                  inputProps={{
                    name: "mobile_no",
                    required: true,
                    autoFocus: true,
                  }}
                />
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
        );
      }}
    </FormikForm>
  );
}
