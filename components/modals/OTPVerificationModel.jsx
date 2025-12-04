"use client";
import React from "react";
import useVerifyOtp from "@/services/tanstack/mutations/useOTPVerification";
import FormikForm from "../forms/FormikForm";
import OtpInputField from "../common/OtpInput";
import ToastHelper from "@/helpers/toastHelper";
import { useRouter } from "next/navigation";
import { useSession } from "@/store/session";

export default function OTPVerificationModel({ loginModalRef }) {
  const router = useRouter();
  const { setSession, id } = useSession();
  const userId = id;

  const { mutate: verifyOtp, isPending: isVerifyOtp } = useVerifyOtp({
    onSuccess: async (data) => {
      const { data: userData, message } = data
      setSession({
        id: userData?.id,
        token: userData?.token,
        user: userData
      });
      loginModalRef.close()
      ToastHelper.success(message || 'OTP verified successfully');
      setTimeout(() => {
        router.push('/')
      }, 1000);
    },
  });

  return (
    <FormikForm
      initialValues={{
        otp: "",
      }}
      onSubmit={(values) => {
        verifyOtp({ id: userId, data: values });
      }}
    >
      {(formik) => (
        <div>
          <h5>Verify the code sent to your WhatsApp</h5>
          <OtpInputField
            onOtpChange={(otp) => {
              formik.setFieldValue("otp", otp);
              if (otp.length === 4) {
                formik.submitForm();
              }
            }}
          />
        </div>
      )}
    </FormikForm>
  );
}
