"use client";

import Details from "@/components/productDetails/details/Details";
import ProductBreadcumb from "@/components/productDetails/ProductBreadcumb";
import RelatedProducts from "@/components/productDetails/RelatedProducts";
import useProductDetails from "@/services/tanstack/queries/useProductDetails";
import { useSession } from "@/store/session";
import React from "react";
import ContentLoader from "../common/ContentLoader";

export default function ProductDetailsContent({ id }) {
    const { id: customer_id } = useSession()
    const { data, isLoading } = useProductDetails(id, { customer_id });
    const product = data;
    if (isLoading) {
        return <ContentLoader image="/images/loaders/artistry-skin-nutrition-vitamin-c.gif" />;
    }
    return (
        <>
            <ProductBreadcumb product={product} />
            <Details product={product} />
            <RelatedProducts product={product} />
        </>
    );
}
