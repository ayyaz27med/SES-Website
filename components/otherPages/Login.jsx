"use client";
import { useRef } from "react";
import LoginForm from "../forms/loginForm";
import useLoginOrRegister from "@/services/tanstack/mutations/useLogin";
import Modal from "../modals/Modal";
import ModalReference from "@/helpers/modalReference";
import OTPVerificationModel from "../modals/OTPVerificationModel";
import { useSession } from "@/store/session";
import ToastHelper from "@/helpers/toastHelper";

export default function Login() {
  const modalRef = useRef(null);
  const loginModalRef = new ModalReference(modalRef);
  const { setUserId } = useSession();
  const { mutate: login, isPending: isLoginLoading } = useLoginOrRegister({
    onSuccess: async (data) => {
      setUserId(data?.data);
      ToastHelper.success(data?.error || 'OTP Send to Your Whatsapp number');
      loginModalRef.open();
    },
  });

  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="login-wrap">
          <div className="left">
            <div className="heading">
              <h4>Login / Register</h4>
            </div>
            <LoginForm onLoginOrRegister={login} isLoading={isLoginLoading} />
            <Modal ref={modalRef}>
              <OTPVerificationModel loginModalRef={loginModalRef} />
            </Modal>
          </div>
        </div>
      </div>
    </section>
  );
}
