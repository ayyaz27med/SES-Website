import Image from "next/image";
import React from "react";
import Link from "next/link";

export const metadata = {
  title:
    "Email Verification Completed || Modave - Multipurpose React Nextjs eCommerce Template",
  description: "Modave - Multipurpose React Nextjs eCommerce Template",
};

export default function EmailVerificationCompleted() {
  return (
    <section className="flat-spacing page-404">
      <div className="container">
        <div className="page-404-inner">
          <div className="image">
            <Image
              className="lazyload"
              data-src="/images/logo/logo.png"
              alt="image"
              src="/images/logo/logo.png"
              width={550}
              height={570}
              priority
            />
          </div>
          <div className="content">
            <div className="heading">Yeay!</div>
            <div>
              <h3 className="title mb_4">Email Verification Complete!</h3>
              <div className="text body-text-1 text-secondary">
                Thanks for confirming your email. Let’s get you back to discovering your favourites.
              </div>
            </div>
            <Link href={`/`} className="tf-btn btn-fill">
              <span className="text text-button">Back To Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
