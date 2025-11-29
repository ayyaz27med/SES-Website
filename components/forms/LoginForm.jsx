"use client";
import "react-phone-input-2/lib/style.css";
import FormikForm from "./FormikForm";
import PhoneInput from "react-phone-input-2";

export default function LoginForm({ onLoginOrRegister, isLoading }) {

    return (
        <FormikForm
            initialValues={{
                mobile_no: "",
                mobile_country_code: "",
            }}
            onSubmit={(values) => {
                onLoginOrRegister(values);
            }}
        >
            {(formik) => (
                <div className="form-login form-has-password mt_10">
                    <div className="wrap">
                        <fieldset className="">
                            <PhoneInput
                                country={"tz"}
                                value={
                                    `${formik.values.mobile_country_code}${formik.values.mobile_no}`
                                }
                                onChange={(value, data) => {
                                    formik.setFieldValue("mobile_country_code", data?.dialCode || "");
                                    formik.setFieldValue(
                                        "mobile_no",
                                        value.replace(data?.dialCode, "")
                                    );
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
                                        className=""
                                        type="checkbox"
                                        id="login-form_agree"
                                        name="agree_checkbox"
                                    />
                                    <div>
                                        <i className="icon-check" />
                                    </div>
                                </div>
                                <label htmlFor="login-form_agree"> Remember me </label>
                            </div>
                        </div>
                    </div>
                    <div className="button-submit">
                        <button className="tf-btn btn-fill" type="submit" disabled={isLoading}>
                            <span className="text text-button">Submit</span>
                        </button>
                    </div>
                </div>
            )}
        </FormikForm>
    );
}
