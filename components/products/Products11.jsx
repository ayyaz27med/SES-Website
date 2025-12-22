"use client";

import LayoutHandler from "./LayoutHandler";
import Listview from "./Listview";
import { useEffect, useMemo, useReducer, useState } from "react";
import useProducts from "@/services/tanstack/queries/useProducts";
import { useRouter, useSearchParams } from "next/navigation";
import { initialState, productFilterOptions, reducer } from "@/utlis/productList";
import ProductsSorting from "./ProductsSorting";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductFilterMeta from "./ProductFilterMeta";
import ProductFilterModal from "./ProductFilterModal";
import ProductGridView from "./ProductGridView";
import useDebounce from "@/utlis/useDebounce";
import { useSession } from "@/store/session";
import useFilters from "@/services/tanstack/queries/useProductsFilters";
import useCategories from "@/services/tanstack/queries/useCategories";
import useBrands from "@/services/tanstack/queries/useBrands";
import { useMultiSubCategories } from "@/utlis/useMultiSubCategories";
import FullScreenLoader from "../common/FullScreenLoader";
import ContentLoader from "../common/ContentLoader";

export default function Products11() {
  const router = useRouter();
  const [activeLayout, setActiveLayout] = useState(4);
  const [page, setPage] = useState(1);
  const { id } = useSession()
  const length = 20;
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subCategoryParam = searchParams.get("sub_category");
  const concernParam = searchParams.get("concerns");
  const suitableParam = searchParams.get("suitable");
  const ingredientsParam = searchParams.get("ingredients");
  const brandParam = searchParams.get("brand");
  const saleParam = searchParams.get("sale");

  const parseMultiParam = (param) => {
    if (!param) return [];
    return param.split("_").filter(Boolean);
  };

  const categoryIds = useMemo(() => {
    return parseMultiParam(categoryParam);
  }, [categoryParam]);

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    price,
    availability,
    selectedBrands,
    selectedSubCategories,
    selectedConcerns,
    selectedIngredients,
    selectedSuitable,
    selectedCategory,
    activeFilterOnSale,
    sortingOption,
  } = state;
  console.log('Selected state:', state);
  const { data: filtersData, isLoading: isFiltersLoading } = useFilters();
  const filters = filtersData || {};

  const brands = filters?.brands || [];
  const categories = filters?.categories || [];
  const subCategories = filters?.sub_categories || [];
  const concerns = filters?.concerns || [];
  const suitable = filters?.suitable || [];
  const ingredients = filters?.ingredient || [];

  const { data: brandsAPIData, isLoading: isBrandsLoading } = useBrands();

  const { data: categoriesAPIData, isLoading: isCategoriesLoading } = useCategories({
    isServerSidePagination: true,
    "order[0][0]": "name",
    "order[0][1]": "ASC",
  });

  const { data: subCategoriesData, isLoading: isSubCategoriesLoading } = useMultiSubCategories(
    categoryIds,
    "sub_category"
  );

  const { data: concernsData, isLoading: isConcernsLoading } = useMultiSubCategories(
    categoryIds,
    "concerns"
  );

  const { data: suitableData, isLoading: isSuitableLoading } = useMultiSubCategories(
    categoryIds,
    "suitable"
  );

  const { data: ingredientsData, isLoading: isIngredientsLoading } = useMultiSubCategories(
    categoryIds,
    "ingredients"
  );

  const isSidebarLoading = isFiltersLoading || isCategoriesLoading || isBrandsLoading || isSubCategoriesLoading || isConcernsLoading || isSuitableLoading || isIngredientsLoading;

  const brandsData = brandsAPIData?.data || [];
  const categoriesData = categoriesAPIData?.data || [];

  const debouncedPrice = useDebounce(price, 500);
  const buildProductParams = (override = {}) => {
    const applied = {
      price,
      ...override,
    };
    const sort =
      productFilterOptions[sortingOption] ||
      productFilterOptions["Sort by (Default)"];

    const params = {
      isServerSidePagination: true,
      start: page,
      length,
      "order[0]": sort.key,
      "order[1]": sort.dir,
      min_price: applied.price?.[0],
      max_price: applied.price?.[1],
      sale: activeFilterOnSale,
      customer_id: id,
      category_id: selectedCategory
        .map(name => (categoriesData?.length ? categoriesData : categories).find(x => x.name === name)?.id)
        .filter(Boolean)
        .join(","),

      sub_category_id: selectedSubCategories
        .map(name => (subCategoriesData?.length ? subCategoriesData : subCategories).find(x => x.name === name)?.id)
        .filter(Boolean)
        .join(","),

      suitable_id: selectedSuitable 
        .map(name => (suitableData?.length ? suitableData : suitable).find(x => x.name === name)?.id)
        .filter(Boolean)
        .join(","),

      concern_id: selectedConcerns
        .map(name => (concernsData?.length ? concernsData : concerns).find(x => x.name === name)?.id)
        .filter(Boolean)
        .join(","),

      ingredients_id: selectedIngredients
        .map(name => (ingredientsData?.length ? ingredientsData : ingredients).find(x => x.name === name)?.id)
        .filter(Boolean)
        .join(","),

      brand_id: selectedBrands
        .map(name => (brandsData.length > 0 ? brandsData : brands).find(x => x.name === name)?.id)
        .filter(Boolean)
        .join(","),
    };
    console.log('Applied filters for product params:', params, 'selectedSubCategories', selectedSubCategories, 'subCategoriesData', subCategoriesData);

    // Remove empty keys ("" or null or undefined)
    Object.keys(params).forEach(key => {
      if (
        params[key] === undefined ||
        params[key] === null ||
        params[key] === "" ||
        params[key]?.length === 0
      ) {
        delete params[key];
      }
    });

    return params;
  };


  const productParams = useMemo(() => {
    return buildProductParams({
      price: debouncedPrice,
    });
  }, [
    debouncedPrice,
    page,
    sortingOption,
    activeFilterOnSale,
    selectedCategory,
    selectedSubCategories,
    selectedConcerns,
    selectedIngredients,
    selectedSuitable,
    selectedBrands,
    categoriesData,
    subCategoriesData,
    concernsData,
    suitableData,
    ingredientsData,
    brandsData,
    id
  ]);

  const { data, isLoading: isProductFetching } = useProducts(productParams);

  // const { data, isLoading: isProductFetching } = useProducts(
  //   buildProductParams({
  //     price: debouncedPrice
  //   })
  // );

  const products = data?.data || [];
  const total = Number(data?.count || 0);
  const totalPages = Math.ceil(total / length);

  useEffect(() => {
    // ---- CATEGORY ----
    if (categoryParam) {
      const ids = parseMultiParam(categoryParam);
      const names = (categoriesData || categories)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);
      if (names) {
        dispatch({ type: "SET_CATEGORY", payload: names });
      }
    }

    // ---- SUB-CATEGORY ----
    if (subCategoryParam) {
      const ids = parseMultiParam(subCategoryParam);
      const names = (subCategoriesData || subCategories)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);
      if (names) {
        dispatch({ type: "SET_SUB_CATEGORIES", payload: names });
      }
    }

    // ---- CONCERNS ----
    if (concernParam) {
      const ids = parseMultiParam(concernParam);
      const names = (concernsData || concerns)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);
      if (names) {
        dispatch({ type: "SET_CONCERNS", payload: names });
      }
    }

    // ---- SUITABLE ----
    if (suitableParam) {
      const ids = parseMultiParam(suitableParam);
      const names = (suitableData || suitable)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);
      if (names) {
        dispatch({ type: "SET_SUITABLE", payload: names });
      }
    }

    // ---- INGREDIENTS ----
    if (ingredientsParam) {
      const ids = parseMultiParam(ingredientsParam);
      const names = (ingredientsData || ingredients)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name || c.bname);
      if (names) {
        dispatch({ type: "SET_INGREDIENTS", payload: names });
      }
    }

    // ---- BRAND ----
    if (brandParam) {
      const ids = parseMultiParam(brandParam);
      const names = (brandsData || brands)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);
      if (names) {
        dispatch({ type: "SET_BRANDS", payload: names });
      }
    }

    // ---- SALE ----
    if (saleParam) {
      dispatch({ type: "FILTER_ON_SALE", payload: [] });
    }
  }, [
    categoryParam,
    subCategoryParam,
    concernParam,
    suitableParam,
    ingredientsParam,
    brandParam,
    categories,
    subCategories,
    concerns,
    suitable,
    ingredients,
    brands,
    categoriesData,
    subCategoriesData,
    concernsData,
    suitableData,
    ingredientsData,
    brandsData,
    saleParam
  ]);

  // Sorted products
  const sorted = useMemo(() => {
    let temp = [...products];

    switch (sortingOption) {
      case "Price Ascending":
        temp.sort((a, b) => Number(a.selling_price) - Number(b.selling_price));
        break;
      case "Price Descending":
        temp.sort((a, b) => Number(b.selling_price) - Number(a.selling_price));
        break;
      case "Title Ascending":
        temp.sort((a, b) => a.pname.localeCompare(b.pname));
        break;
      case "Title Descending":
        temp.sort((a, b) => b.pname.localeCompare(a.pname));
        break;
      default:
        break;
    }
    return temp;
  }, [products, sortingOption]);

  // ------------------------------
  // ALL PROPS FOR CHILD COMPONENTS
  // ------------------------------
  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setAvailability: (value) =>
      value === availability
        ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
        : dispatch({ type: "SET_AVAILABILITY", payload: value }),
    setCategory: (category) => {
      const updated = selectedCategory.includes(category)
        ? selectedCategory.filter((sc) => sc !== category)
        : [...selectedCategory, category];
      dispatch({ type: "SET_CATEGORY", payload: updated });
    },
    removeCategory: (category) =>
      dispatch({
        type: "SET_CATEGORY",
        payload: selectedCategory.filter((sc) => sc !== category),
      }),
    setBrands: (brand) => {
      const updated = selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand];
      dispatch({ type: "SET_BRANDS", payload: updated });
    },
    removeBrand: (brand) =>
      dispatch({
        type: "SET_BRANDS",
        payload: selectedBrands.filter((b) => b !== brand),
      }),
    setSubCategories: (subCategory) => {
      const updated = selectedSubCategories.includes(subCategory)
        ? selectedSubCategories.filter((sc) => sc !== subCategory)
        : [...selectedSubCategories, subCategory];
      console.log('updated sub-categories:', updated);
      dispatch({ type: "SET_SUB_CATEGORIES", payload: updated });
    },
    removeSubCategories: (subCategory) =>
      dispatch({
        type: "SET_SUB_CATEGORIES",
        payload: selectedSubCategories.filter((sc) => sc !== subCategory),
      }),
    setSuitable: (suitable) => {
      const updated = selectedSuitable.includes(suitable)
        ? selectedSuitable.filter((sc) => sc !== suitable)
        : [...selectedSuitable, suitable];
      dispatch({ type: "SET_SUITABLE", payload: updated });
    },
    removeSuitable: (suitable) =>
      dispatch({
        type: "SET_SUITABLE",
        payload: selectedSuitable.filter((sc) => sc !== suitable),
      }),
    setConcerns: (concern) => {
      const updated = selectedConcerns.includes(concern)
        ? selectedConcerns.filter((sc) => sc !== concern)
        : [...selectedConcerns, concern];
      dispatch({ type: "SET_CONCERNS", payload: updated });
    },
    removeConcerns: (concern) =>
      dispatch({
        type: "SET_CONCERNS",
        payload: selectedConcerns.filter((sc) => sc !== concern),
      }),
    setIngredients: (ingredient) => {
      const updated = selectedIngredients.includes(ingredient)
        ? selectedIngredients.filter((sc) => sc !== ingredient)
        : [...selectedIngredients, ingredient];
      dispatch({ type: "SET_INGREDIENTS", payload: updated });
    },
    removeIngredients: (ingredient) =>
      dispatch({
        type: "SET_INGREDIENTS",
        payload: selectedIngredients.filter((sc) => sc !== ingredient),
      }),
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    toggleFilterWithOnSale: () => dispatch({ type: "TOGGLE_FILTER_ON_SALE" }),
    clearFilter: () => {
      dispatch({ type: "CLEAR_FILTER" });
      setPage(1);
      setTimeout(() => {
        router.replace(window.location.pathname);
      }, 0);
    },
  };

  if (isProductFetching && isSidebarLoading) return <FullScreenLoader image="/images/loaders/bags-happy.gif" />;

  return (
    <>
      <section className="flat-spacing">
        <div className="container">
          <div className="tf-shop-control">
            <div className="tf-control-filter">
              <button className="filterShop tf-btn-filter hidden-mx-1200">
                <span className="icon icon-filter" />
                <span className="text">Filters</span>
              </button>
              <a
                href="#filterShop"
                data-bs-toggle="offcanvas"
                aria-controls="filterShop"
                className="tf-btn-filter show-mx-1200"
              >
                <span className="icon icon-filter" />
                <span className="text">Filters</span>
              </a>
              <div
                onClick={allProps.toggleFilterWithOnSale}
                className={`d-none d-lg-flex shop-sale-text ${activeFilterOnSale ? "active" : ""
                  }`}
              >
                <i className="icon icon-checkCircle" />
                <p className="text-caption-1">Shop sale items only</p>
              </div>
            </div>
            <ul className="tf-control-layout">
              <LayoutHandler
                setActiveLayout={setActiveLayout}
                activeLayout={activeLayout}
                hasSidebar
              />
            </ul>
            <div className="tf-control-sorting">
              <p className="d-none d-lg-block text-caption-1">Sort by:</p>
              <ProductsSorting allProps={allProps} />
            </div>
          </div>

          <div className="wrapper-control-shop">
            <ProductFilterMeta productLength={products.length} allProps={allProps} />
            <div className="row">
              <div className="col-xl-3">
                <ProductFilterSidebar
                  allProps={allProps}
                  brands={brands}
                  categories={categories}
                  subCategories={subCategories}
                  concerns={concerns}
                  suitable={suitable}
                  ingredients={ingredients}
                />
              </div>
              <div className="col-xl-9">
                {isProductFetching ? (
                  <ContentLoader image="/images/loaders/nivea-nivea-shower.gif" height="100vh" />
                ) : (
                  <>
                    {activeLayout === 1 ? (
                      <div className="tf-list-layout wrapper-shop" id="listLayout">
                        <Listview
                          products={sorted}
                          page={page}
                          totalPages={totalPages}
                          setPage={setPage}
                        />
                      </div>
                    ) : (
                      <div
                        className={`tf-grid-layout wrapper-shop tf-col-${activeLayout}`}
                        id="gridLayout"
                      >
                        <ProductGridView
                          products={sorted}
                          page={page}
                          totalPages={totalPages}
                          setPage={setPage}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductFilterModal
        allProps={allProps}
        brands={brands}
        categories={categories}
        subCategories={subCategories}
        concerns={concerns}
        suitable={suitable}
        ingredients={ingredients}
      />
    </>
  );
}