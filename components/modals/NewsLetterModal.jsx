"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useHomePagePopupDetails from "@/services/tanstack/queries/useHomePagePopupDetails";
import { useSession } from "@/store/session";
import safeImage from "@/utlis/safeImage";

export default function NewsLetterModal() {
  const pathname = usePathname();
  const modalRef = useRef(null);
  const modalInstanceRef = useRef(null);
  const timeoutRef = useRef(null);
  const { setIsShowWelcomePopup, isShowWelcomePopup } = useSession();
  const { data } = useHomePagePopupDetails()

  const popupData = data?.data
  const bannerImage = popupData?.homePagePopupImages[0]?.image ?? null
  console.log('gggggggggggg', isShowWelcomePopup)

  useEffect(() => {
    if (!isShowWelcomePopup) return;
    if (pathname !== "/") return;

    let isCancelled = false;

    const initModal = async () => {
      const bootstrap = await import("bootstrap");

      if (isCancelled) return;

      modalInstanceRef.current = new bootstrap.Modal(
        modalRef.current,
        { keyboard: false }
      );

      timeoutRef.current = setTimeout(() => {
        if (!isCancelled && isShowWelcomePopup) {
          modalInstanceRef.current.show();
        }
      }, 2000);

      modalRef.current.addEventListener("hidden.bs.modal", () => {
        setIsShowWelcomePopup(false);
      });
    };

    initModal();

    return () => {
      isCancelled = true;
      clearTimeout(timeoutRef.current);
      modalInstanceRef.current?.hide();
      modalInstanceRef.current = null;
    };
  }, [pathname, isShowWelcomePopup, setIsShowWelcomePopup]);

  return (
    <div
      className="modal modalCentered fade auto-popup modal-newleter"
      id="newsletterPopup"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-top">
            <Image
              className="lazyload"
              data-src={bannerImage}
              alt="/images"
              src={safeImage(bannerImage)}
              width={660}
              height={440}
            />
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-bottom text-center">
            <p className="text-btn-uppercase fw-4 font-2">
              {popupData?.upper_title}
            </p>
            <h5>
              {popupData?.main_title}
            </h5>
            <ul className="tf-social-icon style-default justify-content-center">
              {/* <li>
                <a href="#" className="social-facebook">
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a href="#" className="social-twiter">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a href="#" className="social-instagram">
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a href="#" className="social-pinterest">
                  <i className="icon icon-pinterest" />
                </a>
              </li> */}

              <li>
                <a href="https://share.google/9GZMCEiVDjxAmu6GF" target="_blank" className="social-google">
                  <i className="icon icon-google" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/sescosmetics.tz" target="_blank" className="social-instagram">
                  <i className="icon icon-instagram" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/255710071612" target="_blank" className="social-whatsapp">
                  <i className="icon icon-whatsapp" />
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@ses.tz" target="_blank" className="social-tiktok">
                  <i className="icon icon-tiktok" />
                </a>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
