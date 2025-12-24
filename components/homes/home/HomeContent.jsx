"use client";

import Collections from "@/components/homes/home-1/Collections";
import Features from "@/components/common/Features";
import ShopGram from "@/components/common/ShopGram";
import Testimonials from "@/components/common/Testimonials";
import Categories from "@/components/homes/fashion-luxeLiving/Categories";
import NewlyArrived from "@/components/common/NewlyArrived";
import useCategories from "@/services/tanstack/queries/useCategories";
import useSubCategories from "@/services/tanstack/queries/useSubCategories";
import useGoogleReviews from "@/services/tanstack/queries/useGoogleReviews";
import FullScreenLoader from "@/components/common/FullScreenLoader";
import { useMemo } from "react";
import useInstagramPosts from "@/services/tanstack/queries/useInstagramPosts";

export default function HomeContent() {
    // Categories Component Data Fetching 
    const { data: categoriesData, isLoading: categoriesLoading } = useCategories({
        isServerSidePagination: true,
        "order[0][0]": "name",
        "order[0][1]": "ASC",
    });
    const categories = categoriesData?.data || []
    const skincareCategory = categories.find((category) => category.name === "Skincare")
    const bodycareCategory = categories.find((category) => category.name === "Bodycare")
    const haircareCategory = categories.find((category) => category.name === "Haircare")

    const { data: skincareSubCategoriesData, isLoading: skincareSubCategoriesLoading } = useSubCategories({
        category_id: skincareCategory?.id,
        type: 'sub_category',
    });
    const { data: haircareSubCategoriesData, isLoading: haircareSubCategoriesLoading } = useSubCategories({
        category_id: haircareCategory?.id,
        type: 'sub_category',
    });
    const { data: bodycareSubCategoriesData, isLoading: bodycareSubCategoriesLoading } = useSubCategories({
        category_id: bodycareCategory?.id,
        type: 'sub_category',
    });
    const skincareSubCategories = skincareSubCategoriesData?.sub_category ?? [];
    const bodycareSubCategories = bodycareSubCategoriesData?.sub_category ?? [];
    const haircareSubCategories = haircareSubCategoriesData?.sub_category ?? [];

    const skincareToolSubCategory = skincareSubCategories.find(
        c => c.name === "Skincare Tools"
    );

    const bodycareToolSubCategory = bodycareSubCategories.find(
        c => c.name === "Body Tools"
    );

    const haircareToolSubCategory = haircareSubCategories.find(
        c => c.name === "Hair Tools"
    );

    const { data: skincareConcernsData, isLoading: skincareConcernsLoading } = useSubCategories({
        category_id: skincareCategory?.id,
        type: 'concerns',
    });
    const { data: skincareIngredientsData, isLoading: skincareIngredientsLoading } = useSubCategories({
        category_id: skincareCategory?.id,
        type: 'ingredients',
    });
    const { data: bodycareConcernsData, isLoading: bodycareConcernsLoading } = useSubCategories({
        category_id: bodycareCategory?.id,
        type: 'concerns',
    });
    const { data: bodycareIngredientsData, isLoading: bodycareIngredientsLoading } = useSubCategories({
        category_id: bodycareCategory?.id,
        type: 'ingredients',
    });

    const skincareConcerns = skincareConcernsData?.concerns ?? [];
    const bodycareConcerns = bodycareConcernsData?.concerns ?? [];
    const skincareIngredients = skincareIngredientsData?.ingredients ?? [];
    const bodycareIngredients = bodycareIngredientsData?.ingredients ?? [];

    const getIdsByNames = (list = [], names = []) =>
        list
            .filter(item => names.includes(item.name))
            .map(item => item.id);


    // Combine sunscreen IDs from skincare and bodycare
    const sunscreenIds = useMemo(() => {
        return [
            ...getIdsByNames(skincareSubCategories, ["Sunscreens", "Sunscreen Stick"]),
            ...getIdsByNames(bodycareSubCategories, ["Sunscreen"]),
        ].join("_");
    }, [skincareSubCategories, bodycareSubCategories]);

    // Combine hyperpigmentation IDs from skincare and bodycare
    const hyperpigmentationIds = useMemo(() => {
        return [
            ...getIdsByNames(skincareConcerns, ["Hyperpigmentation"]),
            ...getIdsByNames(bodycareConcerns, ["Body Hyperpigmentation"]),
        ].join("_");
    }, [skincareConcerns, bodycareConcerns]);

    // Get cleanser IDs from skincare subcategories
    const cleanserIds = useMemo(() => {
        return [
            ...getIdsByNames(skincareSubCategories, ["Cleansers"]),
        ].join("_");
    }, [skincareSubCategories]);

    // Get Vitamin C IDs from ingredients
    const vitaminCIds = useMemo(() => {
        return [
            ...getIdsByNames(skincareIngredients, ["Vitamin C"]),
            ...getIdsByNames(bodycareIngredients, ["Vitamin C"]),
        ].join("_");
    }, [skincareIngredients, bodycareIngredients]);

    // Get Acne IDs from concerns
    const acneIds = useMemo(() => {
        return [
            ...getIdsByNames(skincareConcerns, ["Acne"]),
            ...getIdsByNames(bodycareConcerns, ["Acne"]),
        ].join("_");
    }, [skincareConcerns, bodycareConcerns]);

    // Get Body Lotion IDs from bodycare subcategories
    const bodyLotionIds = useMemo(() => {
        return [
            ...getIdsByNames(bodycareSubCategories, ["Body Lotions"]),
        ].join("_");
    }, [bodycareSubCategories]);

    const bestSelling = [
        {
            imgSrc: "/images/home-best-selling/Circle1.png",
            alt: "collection-img",
            title: "Sunscreens",
            link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&sub_category=${sunscreenIds}`,
        },
        {
            imgSrc: "/images/home-best-selling/Circle2.png",
            alt: "collection-img",
            title: "Hyperpigmentation",
            link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&concerns=${hyperpigmentationIds}`,
        },
        {
            imgSrc: "/images/home-best-selling/Circle3.png",
            alt: "collection-img",
            title: "Cleansers",
            link: `/products?category=${skincareCategory?.id}&sub_category=${cleanserIds}`,
        },
        {
            imgSrc: "/images/home-best-selling/Circle4.png",
            alt: "collection-img",
            title: "Vitamin C",
            link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&ingredients=${vitaminCIds}`,
        },
        {
            imgSrc: "/images/home-best-selling/Circle5.png",
            alt: "collection-img",
            title: "Acne",
            link: `/products?category=${skincareCategory?.id}_${bodycareCategory?.id}&concerns=${acneIds}`,
        },
        {
            imgSrc: "/images/home-best-selling/Circle6.png",
            alt: "collection-img",
            title: "Body Lotions",
            link: `/products?category=${bodycareCategory?.id}&sub_category=${bodyLotionIds}`,
        },
    ];

    // Testing Components Data Fetching
    const { data: googleReviewsData, isLoading: googleReviewsLoading } = useGoogleReviews()
    const googleReviews = googleReviewsData?.data || []

    // ShopGram Component Data Fetching
    const { data: postsData, isLoading: postsLoading } = useInstagramPosts()
    const posts = postsData?.data || []

    const isLoading =
        googleReviewsLoading ||
        postsLoading ||
        categoriesLoading ||
        bodycareSubCategoriesLoading ||
        haircareSubCategoriesLoading ||
        skincareConcernsLoading ||
        skincareIngredientsLoading ||
        bodycareConcernsLoading ||
        bodycareIngredientsLoading ||
        skincareSubCategoriesLoading;

    if (isLoading) {
        return <FullScreenLoader image="/images/loaders/getting-ready.gif" size={200} />;
    }

    return (
        <>
            <Categories
                skincareCategory={skincareCategory}
                bodycareCategory={bodycareCategory}
                haircareCategory={haircareCategory}
                skincareToolSubCategory={skincareToolSubCategory}
                bodycareToolSubCategory={bodycareToolSubCategory}
                haircareToolSubCategory={haircareToolSubCategory}
            />
            <Collections bestSelling={bestSelling} />
            <NewlyArrived />
            <Testimonials googleReviews={googleReviews} isLoading={googleReviewsLoading} />
            <ShopGram posts={posts} isLoading={postsLoading} />
            <Features />
        </>
    );
}
