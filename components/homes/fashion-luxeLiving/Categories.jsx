import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Categories() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="heading-section text-center wow fadeInUp">
          <h3 className="heading">Shop by categories</h3>
        </div>
        <div className="grid-cls grid-cls-v1">
          <div className="item1 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square1.png"
                alt="banner-cls"
                src="/images/home-categories/Square1.png"
                width={615}
                height={819}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Face Care</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item2 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square2.png"
                alt="banner-cls"
                src="/images/home-categories/Square2.png"
                width={615}
                height={258}
                objectFit="cover"
                style={{ height: '258px' }}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Body Health</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item3 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square3.png"
                alt="banner-cls"
                src="/images/home-categories/Square3.png"
                width={615}
                height={258}
                objectFit="cover"
                style={{ height: '258px' }}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Hair Cares</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
          <div className="item4 collection-position-2 hover-img">
            <a className="img-style">
              <Image
                className="lazyload"
                data-src="/images/home-categories/Square4.png"
                alt="banner-cls"
                src="/images/home-categories/Square4.png"
                width={615}
                height={819}
              />
            </a>
            <div className="content">
              <Link href={`/shop-categories-top`} className="cls-btn">
                <h6 className="text">Tools</h6>
                <i className="icon icon-arrowUpRight" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
