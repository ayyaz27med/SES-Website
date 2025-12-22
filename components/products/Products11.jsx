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
import isEqual from "lodash/isEqual";

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

  const updateQueryParam = (key, values) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!values || values.length === 0) {
      params.delete(key);
    } else {
      params.set(key, values.join("_"));
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const toggleParamValue = (paramKey, value, paramValue) => {
    const current = paramValue ? paramValue.split("_") : [];

    const updated = current.includes(String(value))
      ? current.filter(v => v !== String(value))
      : [...current, String(value)];

    updateQueryParam(paramKey, updated);
  };

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

  const products = data?.data || [];
  const total = Number(data?.count || 0);
  const totalPages = Math.ceil(total / length);

  useEffect(() => {
    /* ---------------- CATEGORY ---------------- */
    if (categoryParam && (categoriesData.length || categories.length)) {
      const ids = parseMultiParam(categoryParam);
      const names = (categoriesData.length ? categoriesData : categories)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);

      if (!isEqual(names, selectedCategory)) {
        dispatch({ type: "SET_CATEGORY", payload: names });
      }
    } else if (!categoryParam && selectedCategory.length) {
      dispatch({ type: "SET_CATEGORY", payload: [] });
    }

    /* ---------------- SUB CATEGORY ---------------- */
    if (subCategoryParam && (subCategoriesData.length || subCategories.length)) {
      const ids = parseMultiParam(subCategoryParam);
      const names = (subCategoriesData.length ? subCategoriesData : subCategories)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);

      if (!isEqual(names, selectedSubCategories)) {
        dispatch({ type: "SET_SUB_CATEGORIES", payload: names });
      }
    } else if (!subCategoryParam && selectedSubCategories.length) {
      dispatch({ type: "SET_SUB_CATEGORIES", payload: [] });
    }

    /* ---------------- CONCERNS ---------------- */
    if (concernParam && (concernsData.length || concerns.length)) {
      const ids = parseMultiParam(concernParam);
      const names = (concernsData.length ? concernsData : concerns)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);

      if (!isEqual(names, selectedConcerns)) {
        dispatch({ type: "SET_CONCERNS", payload: names });
      }
    } else if (!concernParam && selectedConcerns.length) {
      dispatch({ type: "SET_CONCERNS", payload: [] });
    }

    /* ---------------- SUITABLE ---------------- */
    if (suitableParam && (suitableData.length || suitable.length)) {
      const ids = parseMultiParam(suitableParam);
      const names = (suitableData.length ? suitableData : suitable)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);

      if (!isEqual(names, selectedSuitable)) {
        dispatch({ type: "SET_SUITABLE", payload: names });
      }
    } else if (!suitableParam && selectedSuitable.length) {
      dispatch({ type: "SET_SUITABLE", payload: [] });
    }

    /* ---------------- INGREDIENTS ---------------- */
    if (ingredientsParam && (ingredientsData.length || ingredients.length)) {
      const ids = parseMultiParam(ingredientsParam);
      const names = (ingredientsData?.length ? ingredientsData : ingredients)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);

      if (!isEqual(names, selectedIngredients)) {
        dispatch({ type: "SET_INGREDIENTS", payload: names });
      }
    } else if (!ingredientsParam && selectedIngredients.length) {
      dispatch({ type: "SET_INGREDIENTS", payload: [] });
    }

    /* ---------------- BRANDS ---------------- */
    if (brandParam && (brandsData.length || brands.length)) {
      const ids = parseMultiParam(brandParam);
      const names = (brandsData?.length ? brandsData : brands)
        .filter(c => ids.includes(String(c.id)))
        .map(c => c.name);

      if (!isEqual(names, selectedBrands)) {
        dispatch({ type: "SET_BRANDS", payload: names });
      }
    } else if (!brandParam && selectedBrands.length) {
      dispatch({ type: "SET_BRANDS", payload: [] });
    }

    /* ---------------- SALE ---------------- */
    if (saleParam && !activeFilterOnSale) {
      dispatch({ type: "FILTER_ON_SALE" });
    } else if (!saleParam && activeFilterOnSale) {
      dispatch({ type: "FILTER_ON_SALE" });
    }
  }, [
    categoryParam,
    subCategoryParam,
    concernParam,
    suitableParam,
    ingredientsParam,
    brandParam,
    saleParam,
    categoriesData,
    subCategoriesData,
    concernsData,
    suitableData,
    ingredientsData,
    brandsData,
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

    /* ---------------- PRICE (local only) ---------------- */
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),

    /* ---------------- AVAILABILITY (local only) ---------------- */
    setAvailability: (value) =>
      value === availability
        ? dispatch({ type: "SET_AVAILABILITY", payload: "All" })
        : dispatch({ type: "SET_AVAILABILITY", payload: value }),

    /* ---------------- CATEGORY ---------------- */
    setCategory: (name) => {
      const allSubCategories = [...categoriesData, ...categories]
      const id = allSubCategories.find(c => c.name === name)?.id;
      if (!id) return;
      toggleParamValue("category", id, categoryParam);
    },
    removeCategory: (name) => {
      const allSubCategories = [...categoriesData, ...categories]
      const id = allSubCategories.find(c => c.name === name)?.id;
      const updated = parseMultiParam(categoryParam).filter(v => v !== String(id));
      updateQueryParam("category", updated);
    },

    /* ---------------- SUB CATEGORY ---------------- */
    setSubCategories: (name) => {
      const allSubCategories = [...subCategoriesData, ...subCategories]
      const id = allSubCategories.find(c => c.name === name)?.id;
      if (!id) return;
      toggleParamValue("sub_category", id, subCategoryParam);
    },
    removeSubCategories: (name) => {
      const allSubCategories = [...subCategoriesData, ...subCategories]
      const id = allSubCategories.find(c => c.name === name)?.id;
      const updated = parseMultiParam(subCategoryParam).filter(v => v !== String(id));
      updateQueryParam("sub_category", updated);
    },

    /* ---------------- SUITABLE ---------------- */
    setSuitable: (name) => {
      const allSuitable = [...suitableData, ...suitable]
      const id = allSuitable.find(c => c.name === name)?.id;
      if (!id) return;
      toggleParamValue("suitable", id, suitableParam);
    },
    removeSuitable: (name) => {
      const allSuitable = [...suitableData, ...suitable]
      const id = allSuitable.find(c => c.name === name)?.id;
      const updated = parseMultiParam(suitableParam).filter(v => v !== String(id));
      updateQueryParam("suitable", updated);
    },

    /* ---------------- CONCERNS ---------------- */
    setConcerns: (name) => {
      const allConcerns = [...concernsData, ...concerns]
      const id = allConcerns.find(c => c.name === name)?.id;
      if (!id) return;
      toggleParamValue("concerns", id, concernParam);
    },
    removeConcerns: (name) => {
      const allConcerns = [...concernsData, ...concerns]
      const id = allConcerns.find(c => c.name === name)?.id;
      const updated = parseMultiParam(concernParam).filter(v => v !== String(id));
      updateQueryParam("concerns", updated);
    },

    /* ---------------- INGREDIENTS ---------------- */
    setIngredients: (name) => {
      const allIngredients = [...ingredientsData, ...ingredients]
      const id = allIngredients.find(c => c.name === name)?.id;
      if (!id) return;
      toggleParamValue("ingredients", id, ingredientsParam);
    },
    removeIngredients: (name) => {
      const allIngredients = [...ingredientsData, ...ingredients]
      const id = allIngredients.find(c => c.name === name)?.id;
      const updated = parseMultiParam(ingredientsParam).filter(v => v !== String(id));
      updateQueryParam("ingredients", updated);
    },

    /* ---------------- BRANDS ---------------- */
    setBrands: (name) => {
      const allBrands = [...brandsData, ...brands]
      const id = allBrands.find(b => b.name === name)?.id;
      if (!id) return;
      toggleParamValue("brand", id, brandParam);
    },
    removeBrand: (name) => {
      const allBrands = [...brandsData, ...brands]
      const id = allBrands.find(b => b.name === name)?.id;
      const updated = parseMultiParam(brandParam).filter(v => v !== String(id));
      updateQueryParam("brand", updated);
    },

    /* ---------------- SORTING ---------------- */
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),

    /* ---------------- SALE ---------------- */
    toggleFilterWithOnSale: () => {
      const value = saleParam ? [] : ["1"];
      updateQueryParam("sale", value);
    },

    /* ---------------- CLEAR ALL ---------------- */
    clearFilter: () => {
      setPage(1);
      router.replace(window.location.pathname);
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