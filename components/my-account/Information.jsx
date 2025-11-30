"use client";
import React from "react";
import FormikForm from "../forms/FormikForm";
import useUpdateProfile from "@/services/tanstack/mutations/useUpdateProfile";
import { useSession } from "@/store/session";

export default function Information({ userDetails }) {
  const { setSession } = useSession();
  const initialValues = {
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    mobile_no: userDetails?.mobile_no || "",
  };

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile({
      onSuccess: async (data) => {
        const { data: userData, message } = data;
        setSession({
          id: userData?.id,
          token: userData?.token,
          user: userData,
        });
        loginModalRef.close();
        ToastHelper.success(message || "OTP verified successfully");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      },
    });

  return (
    <div className="my-account-content">
      <div className="account-details">
        <FormikForm
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={(values) => {
            const { mobile_no, ...updatedValues } = values;
            updateProfile(updatedValues);
          }}
          className="form-account-details form-has-password"
        >
          {(formik) => {
            return (
              <>
                <div className="account-info">
                  <h5 className="title">Information</h5>

                  {/* FULL NAME */}
                  <div className="mb_20">
                    <fieldset>
                      <input
                        type="text"
                        placeholder="Full Name*"
                        name="name"
                        value={formik.values.name}
                        onChange={(e) =>
                          formik.setFieldValue("name", e.target.value)
                        }
                        required
                      />
                    </fieldset>
                  </div>

                  {/* EMAIL + PHONE */}
                  <div className="cols mb_20">
                    <fieldset>
                      <input
                        type="email"
                        placeholder="Username or email address*"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) =>
                          formik.setFieldValue("email", e.target.value)
                        }
                        required
                      />
                    </fieldset>

                    <fieldset>
                      <input
                        type="text"
                        readOnly
                        placeholder="Phone*"
                        name="mobile_no"
                        value={formik.values.mobile_no}
                      />
                    </fieldset>
                  </div>
                </div>

                <div className="button-submit">
                  <button className="tf-btn btn-fill" type="submit" disabled={isUpdatingProfile}>
                    <span className="text text-button">Update Account</span>
                  </button>
                </div>
              </>
            );
          }}
        </FormikForm>
      </div>
    </div>
  );
}
