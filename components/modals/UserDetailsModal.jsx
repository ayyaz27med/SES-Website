"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "@/store/session";
import FormikForm from "../forms/FormikForm";
import useUpdateProfile from "@/services/tanstack/mutations/useUpdateProfile";
import ToastHelper from "@/helpers/toastHelper";
import { queryClient } from "@/utlis/queryClient";
import { queryKeys } from "@/services/tanstack/queries";
import LanguageFlagSelect from "../common/LanguageFlagSelect";

const isEmpty = (value) => value === undefined || value === null || value === "";

export default function UserDetailsModal() {
  const pathname = usePathname();
  const modalElement = useRef();
  const modalInstanceRef = useRef(null);
  const { user, setUser } = useSession();
  const { isShowUserDetailsPopup, setIsShowUserDetailsPopup } = useSession();

  const initialValues = {
    name: user?.name || "",
    email: user?.email || "",
    customer_language: user?.customer_language || "",
  };

  const isNameMissing = isEmpty(user?.name);
  const isEmailMissing = isEmpty(user?.email);
  const isLanguageMissing = isEmpty(user?.customer_language);

  const shouldShowModal = isNameMissing || isEmailMissing || isLanguageMissing;

  const { mutate: updateProfile, isPending: isUpdatingProfile } =
    useUpdateProfile({
      onSuccess: async (data) => {
        const { data: userData, message } = data;
        setUser(userData);
        ToastHelper.success(message);
        queryClient.invalidateQueries({
          queryKey: [queryKeys.userDetails],
        });
        modalInstanceRef.current?.hide(); // <-- FIXED
        setIsShowUserDetailsPopup(false)
      },
      onError: (data) => {
        const { message } = data;
        ToastHelper.error(message);
      },
    });


  useEffect(() => {
    let modalEl;
    let modal;

    const initModal = async () => {
      if (!user?.id) return;

      if (!shouldShowModal && !isShowUserDetailsPopup) return;

      if (pathname === "/" && isShowUserDetailsPopup) {
        const bootstrap = await import("bootstrap");

        modalEl = document.getElementById("userDetailsPopup");
        modal = new bootstrap.Modal(modalEl, {
          keyboard: false,
          backdrop: true,
        });

        modalInstanceRef.current = modal;

        modalEl.addEventListener("hidden.bs.modal", handleModalClose);

        await new Promise((resolve) => setTimeout(resolve, 2000));
        modal.show();
      }
    };

    const handleModalClose = () => {
      setIsShowUserDetailsPopup(false);
    };

    initModal();

    return () => {
      if (modalEl) {
        modalEl.removeEventListener("hidden.bs.modal", handleModalClose);
      }
    };
  }, [pathname, user?.id, shouldShowModal, isShowUserDetailsPopup]);

  return (
    <div
      className="modal modalCentered fade auto-popup modal-user-details"
      id="userDetailsPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-bottom text-center">
            <FormikForm
              initialValues={initialValues}
              enableReinitialize={true}
              onSubmit={(values) => {
                updateProfile(values);
              }}
              className="form-account-details form-has-password"
            >
              {(formik) => {
                return (
                  <>
                    <div className="account-info">
                      <h5 className="title">Complete Your Profile</h5>
                      <div className="tf-grid-layout lg-col-12 md-col-12 sm-col-12 mb_20 w-100">
                        {isNameMissing && (
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
                        )}
                        {isEmailMissing && (
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
                        )}
                        {isLanguageMissing && (
                          <fieldset>
                            <LanguageFlagSelect
                              topStart
                              value={formik.values.customer_language}
                              placeholder="Select Language"
                              onChange={(langValue) => formik.setFieldValue("customer_language", langValue)}
                            />
                          </fieldset>
                        )}
                      </div>
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
      </div>
    </div>
  );
}
