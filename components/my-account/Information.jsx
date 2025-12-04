"use client";
import React from "react";
import FormikForm from "../forms/FormikForm";
import useUpdateProfile from "@/services/tanstack/mutations/useUpdateProfile";
import { useSession } from "@/store/session";
import ToastHelper from "@/helpers/toastHelper";
import { queryClient } from "@/utlis/queryClient";
import { queryKeys } from "@/services/tanstack/queries";
import LanguageFlagSelect from "../common/LanguageFlagSelect";

export default function Information({ userDetails }) {
  const { setUser } = useSession();
  const initialValues = {
    name: userDetails?.name || "",
    email: userDetails?.email || "",
    mobile_no: userDetails?.mobile_no || "",
  };

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile({
      onSuccess: async (data) => {
        const { data: userData, message } = data;
        setUser(userData);
        ToastHelper.success(message || "OTP verified successfully");
        queryClient.invalidateQueries({
          queryKey: [queryKeys.userDetails],
        });
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
                  <h5 className="title">Profile Information</h5>
                  <div className="tf-grid-layout lg-col-2 md-col-2 sm-col-2 mb_20">

                    {/* FULL NAME */}
                    <div className="col-12">
                      <fieldset>
                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={formik.values.name}
                          onChange={(e) =>
                            formik.setFieldValue("name", e.target.value)
                          }
                        />
                      </fieldset>
                    </div>

                    {/* EMAIL + PHONE */}
                    <fieldset>
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) =>
                          formik.setFieldValue("email", e.target.value)
                        }
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
                    <fieldset>
                      <LanguageFlagSelect topStart />
                    </fieldset>
                  </div>
                  {/* </div> */}
                </div>

                <div className="button-submit">
                  <button className="tf-btn btn-fill" type="submit" disabled={isUpdatingProfile || !formik.dirty}>
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
