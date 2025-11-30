"use client";

import "react-toastify/dist/ReactToastify.css";

import { QueryClient } from "@tanstack/react-query";
import ToastHelper from "@/helpers/toastHelper.js";

const renderErrorItems = (items) => {
  return (
    <ul style={{ marginTop: "10px" }}>
      {items?.map((i) => <li key={i}>{i}</li>)}
    </ul>
  );
};

const showErrorToast = (err) => {
  const data = err?.response?.data;

  const message = data?.error?.message ?? err?.message ?? data;

  const validationMessages = data?.validationMessages;

  const error =
    typeof message === "string"
      ? message
      : "Something went wrong with the request";

  const isValidationErr =
    data?.error === "ValidationError" || error === "ValidationError";

  const validationErrors = validationMessages
    ? Object.values(validationMessages)?.map((e) => e?.toString())
    : null;

  // let title = "Error";
  let description = error;

  if (isValidationErr && validationErrors) {
    // title = "Validation Error";
    description = renderErrorItems(validationErrors);
  }

  ToastHelper.error(description.toString());
};

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (error) => {
        showErrorToast(error);
      },
    },
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000 * 5,
    },
  },
});
