"use client";

import Image from "next/image";
import Link from "next/link";

export default function Topbar5({ parentClass = "tf-topbar style-2 d-none d-xl-block" }) {
  return (
    <div className={parentClass}>
      <div className="header-fullwidth">
        <div className="row align-items-center">
          <div className="col-xl-5 d-none d-xl-block">
            <ul className="tf-social-icon style-fill">
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
          <div className="col-xl-2 text-center d-xl-block">
            <Link href={`/`}>
              <Image
                alt=""
                src="/images/logo/logo.png"
                width={80}
                height={80}
              />
            </Link>
          </div>
          <div className="col-xl-5 col-12 justify-content-center gap-10 d-xl-flex d-none">
            <Link
              href="/contact-us"
              className="text-decoration-underline top-bar-text extra-small-text d-flex justify-content-center text-btn-uppercase fw-semibold letter-1"
            >
              Our Store
            </Link>
            <p className="top-bar-text extra-small-text text-btn-uppercase fw-semibold letter-1">
              1st Floor, Girls Guide Building, Kibasila St, Upanga - Dar es Salaam 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
