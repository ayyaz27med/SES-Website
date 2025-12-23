"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import safeImage from "@/utlis/safeImage";
import useToggleWishlist from "@/services/tanstack/mutations/useToggleWishlist";
import ToastHelper from "@/helpers/toastHelper";
import { queryClient } from "@/utlis/queryClient";
import { queryKeys } from "@/services/tanstack/queries";
import { useSession } from "@/store/session";
import { GoHeart } from "react-icons/go";
import { IoHeartSharp } from "react-icons/io5";
import { useCartContextElement } from "@/context/CartContext";

export default function ProductCard({
  product,
  gridClass = "",
  parentClass = "card-product wow fadeInUp",
  isNotImageRatio = false,
  radiusClass = "",
}) {
  const [currentImage, setCurrentImage] = useState(product.main_picture);
  const { isAuthenticated } = useSession();
  const {
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
    setQuickViewItemId,
  } = useCartContextElement();

  useEffect(() => {
    setCurrentImage(product.main_picture);
  }, [product]);

  if (!product) {
    return null;
  }

  const { mutate: toggleWishlist } = useToggleWishlist({
    onSuccess: async (data) => {
      const { message } = data;
      ToastHelper.success(message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.productDetails],
      });
    },
    onError: (error) => {
      ToastHelper.error(error.message);
    },
  });

  return (
    <div
      className={`${parentClass} ${gridClass} ${product.isOnSale ? "on-sale" : ""
        } ${product.sizes ? "card-product-size" : ""}`}
    >
      <div
        className={`card-product-wrapper ${isNotImageRatio ? "aspect-ratio-0" : ""
          } ${radiusClass} `}
      >
        <Link href={`/product-detail/${product.id}`} className="product-img">
          <Image
            className="lazyload img-product"
            src={safeImage(currentImage)}
            alt={`${product.pname} front view`}
            width={600}
            height={800}
          />

          <Image
            className="lazyload img-hover"
            src={safeImage(currentImage)}
            alt={`${product.pname} hover view`}
            width={600}
            height={800}
          />
        </Link>
        {product?.sales_percentage && (
          <div className="marquee-product bg-main">
            <div className="marquee-wrapper">
              {[...Array(5)].map((_, index) => (
                <div className="initial-child-container" key={index}>
                  <div className="marquee-child-item">
                    <p className="font-2 text-btn-uppercase fw-6 text-white">
                      LIMITED TIME SALE | {product?.sales_percentage}% OFF
                    </p>
                  </div>
                  <div className="marquee-child-item">
                    <span className="icon icon-lightning text-critical" />
                  </div>
                </div>
              ))}
            </div>
            <div className="marquee-wrapper">
              {[...Array(5)].map((_, index) => (
                <div className="initial-child-container" key={index}>
                  <div className="marquee-child-item">
                    <p className="font-2 text-btn-uppercase fw-6 text-white">
                      LIMITED TIME SALE | {product?.sales_percentage}% OFF
                    </p>
                  </div>
                  <div className="marquee-child-item">
                    <span className="icon icon-lightning text-critical" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {product.sales_percentage > 0 && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">-{product.sales_percentage}%</span>
          </div>
        )}
        {product.stock_status === 'out_of_stock' && (
          <div className="variant-wrap countdown-wrap">
            <div className="variant-box">
              <div className="js-countdown">
                <div>Time's up!</div>
              </div>
            </div>
          </div>
        )}
        <div className="list-product-btn">
          {isAuthenticated && product?.new_selling_price == 0 && (
            <a
              onClick={() => toggleWishlist({ product_id: product.id })}
              className="box-icon wishlist btn-icon-action"
            >
              {product.is_wishlist ? <IoHeartSharp color="red" size={50} /> : <GoHeart size={50} />}
              <span className="tooltip">
                {product.is_wishlist
                  ? "Remove from wishlist"
                  : "Add to wishlist"}
              </span>
            </a>
          )}
          <a
            href="#productQuickView"
            onClick={() => {
              setQuickViewItem(product);
              setQuickViewItemId(product.id);
            }}
            data-bs-toggle="modal"
            className="box-icon quickview tf-btn-loading"
          >
            <span className="icon icon-eye" />
            <span className="tooltip">Quick View</span>
          </a>
        </div>
        <div className="list-btn-main">
          <a
            className="btn-main-product"
            onClick={() => addProductToCart(product)}
          >
            {isAddedToCartProducts(product.id)
              ? "Already Added"
              : "ADD TO CART"}
          </a>
        </div>
      </div>
      <div className="card-product-info">
        <Link href={`/product-detail/${product.id}`} className="title link">
          {product.pname}
        </Link>
        <span className="price">
          {product?.new_selling_price > 0 && <span className="old-price">{formatWithCurrency(product?.selling_price)}</span>}
          {formatWithCurrency(product?.new_selling_price > 0 ? product?.new_selling_price : product?.selling_price)}
        </span>
      </div>
    </div>
  );
}
