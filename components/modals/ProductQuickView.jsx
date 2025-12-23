"use client";
import React, { useState } from "react";
import QuantitySelect from "../productDetails/QuantitySelect";
import { formatWithCurrency } from "@/hooks/useAmountFormatter";
import useProductDetails from "@/services/tanstack/queries/useProductDetails";
import ProductQuickViewGrid from "../productDetails/grids/ProductQuickViewGrid";
import { useCartContextElement } from "@/context/CartContext";
import { IoHeartSharp } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { useSession } from "@/store/session";
import useToggleWishlist from "@/services/tanstack/mutations/useToggleWishlist";
import { queryKeys } from "@/services/tanstack/queries";
import ToastHelper from "@/helpers/toastHelper";
import { queryClient } from "@/utlis/queryClient";
import ContentLoader from "../common/ContentLoader";

export default function ProductQuickView() {
  const [quantity, setQuantity] = useState(1);
  const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
  const { isAuthenticated, id: customer_id } = useSession();

  const {
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
    quickViewItemId,
    setQuickViewItemId
  } = useCartContextElement();

  const { data, isLoading } = useProductDetails(quickViewItemId, { customer_id });
  const product = data;

  const categoriesName = data?.category.map(c => c.name).join(", ");

  const { mutate: toggleWishlist } = useToggleWishlist({
    onSuccess: async (data) => {
      const { message } = data;
      ToastHelper.success(message);
      queryClient.invalidateQueries({
        queryKey: [queryKeys.productDetails],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.products],
      });
    },
    onError: (error) => {
      ToastHelper.error(error.message);
    },
  });

  if (!quickViewItemId && isLoading) {
    return <ContentLoader image="/images/loaders/nivea-nivea-shower.gif" height="100vh" />;
  }
  return (
    <div className="modal fullRight fade modal-quick-view" id="productQuickView">
      <div className="modal-dialog">
        <div className="modal-content">
          {!isLoading ? (
            <>
              <ProductQuickViewGrid
                firstItem={product?.main_picture}
                slideItems={product?.pictures}
              />
              <div className="wrap mw-100p-hidden">
                <div className="header">
                  <h5 className="title">Quick View</h5>
                  <span
                    onClick={() => setQuickViewItemId('')}
                    className="icon-close icon-close-popup"
                    data-bs-dismiss="modal"
                  />
                </div>
                <div className="tf-product-info-list">
                  <div className="tf-product-info-heading">
                    <div className="tf-product-info-name">
                      <div className="text text-btn-uppercase">{categoriesName}</div>
                      <h4 className="name">{product?.pname}</h4>
                      <div className="sub">
                        <div className="tf-product-info-rate">
                          <div className="list-star">
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                            <i className="icon icon-star" />
                          </div>
                          <div className="text text-caption-1">(134 reviews)</div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-desc">
                      <div className="tf-product-info-price">
                        <h5 className="price-on-sale font-2">
                          {formatWithCurrency(product?.new_selling_price ? product?.new_selling_price : product?.selling_price)}
                        </h5>
                        {product?.new_selling_price > 0 ? (
                          <>
                            <div className="compare-at-price font-2">
                              {formatWithCurrency(product?.selling_price)}
                            </div>
                            <div className="badges-on-sale text-btn-uppercase">
                              -25%
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>
                        {isReadMoreExpanded
                          ? product?.descr
                          : product?.descr.slice(0, 200) + "..."}
                        {product?.descr.length > 200 && (
                          <span
                            style={{ cursor: "pointer", color: "#3DAB25", marginLeft: 4 }}
                            className="small"
                            onClick={() =>
                              setIsReadMoreExpanded(prev => !prev)
                            }
                          >
                            {isReadMoreExpanded ? "View Less" : "View More"}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option">
                    <div className="tf-product-info-quantity">
                      <div className="title mb_12">Quantity:</div>
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(product?.id)
                            ? cartProducts.filter(
                              (elm) => elm.id == product?.id
                            )[0].quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product?.id)) {
                            updateQuantity(product?.id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <div className="tf-product-info-by-btn mb_10">
                        <a
                          className="btn-style-2 flex-grow-1 text-btn-uppercase fw-6 show-shopping-cart"
                          onClick={() =>
                            addProductToCart(product?.id, quantity)
                          }
                        >
                          <span>
                            {isAddedToCartProducts(product?.id)
                              ? "Already Added"
                              : "Add to cart -"}
                          </span>
                          <span className="tf-qty-price total-price">
                            {formatWithCurrency(isAddedToCartProducts(product?.id)
                              ? (
                                (product?.new_selling_price > 0 ? product?.new_selling_price : product?.selling_price) *
                                cartProducts.filter(
                                  (elm) => elm.id == product?.id
                                )[0].quantity
                              )
                              : ((product?.new_selling_price > 0 ? product?.new_selling_price : product?.selling_price) * quantity))}
                          </span>
                        </a>
                        <a
                          className="box-icon hover-tooltip compare btn-icon-action show-compare"
                        >
                          <div className="icon">
                            <i className="icon-share" />
                          </div>
                          <span className="tooltip text-caption-2">
                            Share
                          </span>
                        </a>
                        {isAuthenticated && product?.new_selling_price == 0 && (
                          <a
                            onClick={() => toggleWishlist({ product_id: product.id })}
                            className="box-icon hover-tooltip text-caption-2 wishlist btn-icon-action"
                          >
                            {product.is_wishlist ? <IoHeartSharp color="red" size={25} /> : <GoHeart size={25} />}
                            <span className="tooltip text-caption-2">
                              {product.is_wishlist
                                ? "Remove from wishlist"
                                : "Add to wishlist"}
                            </span>
                          </a>
                        )}
                      </div>
                      <a href="#" className="btn-style-3 text-btn-uppercase">
                        Buy it now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ContentLoader image="/images/loaders/beauty-cute.gif" height="100vh" />
          )}
        </div>
      </div>
    </div>
  );
}
