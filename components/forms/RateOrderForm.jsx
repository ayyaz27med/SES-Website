"use client";
import React from "react";
import FormikForm from "./FormikForm";
import ToastHelper from "@/helpers/toastHelper";
import * as Yup from "yup";
import FormikTextArea from "../common/FormikTextarea";
import RatingStars from "../otherPages/RatingStars";
import useRateOrder from "@/services/tanstack/mutations/useRateOrder";
import { useSession } from "@/store/session";

const validationSchema = Yup.object().shape({
  delivery_rate: Yup.string().required("Delivery rate is required"),
  product_rate: Yup.string().required("Product service rate is required"),
  customer_service_rate: Yup.string().required("Customer service rate is required"),
  message: Yup.string().required("Message is required"),
});

export default function RateOrderForm({ id }) {
  const { user } = useSession();
  const { mutate: rateOrder, isPending: isLoading } = useRateOrder({
    onSuccess: async (data) => {
      ToastHelper.success(data?.message);
    },
    onError: (data) => {
      ToastHelper.error(data?.message);
    },
  });

  return (
    <div className="container flat-spacing-5">
      <FormikForm
        initialValues={{
          order_number: "",
          customer_name: user?.name,
          customer_mobile_number: user?.mobile_no,
          customer_mobile_country_code: user?.mobile_country_code,
          message: "",
          delivery_rate: "",
          product_rate: "",
          customer_service_rate: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          rateOrder(values, {
            onSuccess: () => {
              resetForm();
            },
          });
        }}
      >
        {(formik) => {
          return (
            <div className="rate-order">
              <div className="px-lg-5 px-md-4 px-sm-1">
                <div>
                  <h6 className="mb_16">Order No: </h6>
                  <div className="tf-grid-layout md-col-3 mb-4">
                    <RatingStars
                      label="Product Rating"
                      value={formik.values.product_rate}
                      onChange={(val) =>
                        formik.setFieldValue("product_rate", val)
                      }
                      error={
                        formik.submitCount > 0
                          ? formik.errors.product_rate
                          : null
                      }
                    />
                    <RatingStars
                      label="Delivery Rating"
                      value={formik.values.delivery_rate}
                      onChange={(val) =>
                        formik.setFieldValue("delivery_rate", val)
                      }
                      error={
                        formik.submitCount > 0
                          ? formik.errors.delivery_rate
                          : null
                      }
                    />
                    <RatingStars
                      label="Customer Service Rating"
                      value={formik.values.customer_service_rate}
                      onChange={(val) =>
                        formik.setFieldValue("customer_service_rate", val)
                      }
                      error={
                        formik.submitCount > 0
                          ? formik.errors.customer_service_rate
                          : null
                      }
                    />
                  </div>
                  <fieldset className="mb_16">
                    <FormikTextArea
                      name="message"
                      placeholder="Message..."
                    />
                  </fieldset>
                </div>
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
    </div>
  );
}
