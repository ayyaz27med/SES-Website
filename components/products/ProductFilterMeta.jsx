import React, { useMemo } from "react";

export default function ProductFilterMeta({
  allProps,
  productLength,
  allBrands = [],
  allCategories = [],
  allSubCategories = [],
  allSuitable = [],
  allIngredients = [],
  allConcerns = [],
}) {
  const {
    selectedSuitableIds = [],
    selectedConcernIds = [],
    selectedIngredientIds = [],
    selectedBrandIds = [],
    selectedSubCategoryIds = [],
    selectedCategoryIds = [],
  } = allProps;

  // Filter data to show only selected items
  const filteredCategories = useMemo(
    () => allCategories.filter(c => selectedCategoryIds.includes(String(c.id))),
    [allCategories, selectedCategoryIds]
  );

  const filteredSubCategories = useMemo(
    () => allSubCategories.filter(sc => selectedSubCategoryIds.includes(String(sc.id))),
    [allSubCategories, selectedSubCategoryIds]
  );

  const filteredBrands = useMemo(
    () => allBrands.filter(b => selectedBrandIds.includes(String(b.id))),
    [allBrands, selectedBrandIds]
  );

  const filteredSuitable = useMemo(
    () => allSuitable.filter(s => selectedSuitableIds.includes(String(s.id))),
    [allSuitable, selectedSuitableIds]
  );

  const filteredIngredients = useMemo(
    () => allIngredients.filter(i => selectedIngredientIds.includes(String(i.id))),
    [allIngredients, selectedIngredientIds]
  );

  const filteredConcerns = useMemo(
    () => allConcerns.filter(c => selectedConcernIds.includes(String(c.id))),
    [allConcerns, selectedConcernIds]
  );

  const isShowRemoveAll =
    allProps.availability !== "All" ||
    filteredBrands.length ||
    filteredCategories.length ||
    filteredSuitable.length ||
    filteredIngredients.length ||
    filteredConcerns.length ||
    filteredSubCategories.length;

  return (
    <div className="meta-filter-shop">
      <div id="product-count-grid" className="count-text">
        <span className="count">{productLength}</span> Products Found
      </div>

      <div id="applied-filters">
        {allProps.availability !== "All" && (
          <span
            className="filter-tag"
            onClick={() => allProps.setAvailability("All")}
          >
            {allProps.availability.label}
            <span className="remove-tag icon-close" />
          </span>
        )}

        {filteredCategories.map((category) => (
          <span
            key={category.id}
            className="filter-tag"
            onClick={() => allProps.removeCategory(category?.id)}
          >
            {category.name}
            <span className="remove-tag icon-close" />
          </span>
        ))}

        {filteredSubCategories.map((subCategory) => (
          <span
            key={subCategory.id}
            className="filter-tag"
            onClick={() => allProps.removeSubCategories(subCategory?.id)}
          >
            {subCategory.name}
            <span className="remove-tag icon-close" />
          </span>
        ))}

        {filteredBrands.map((brand) => (
          <span
            key={brand.id}
            className="filter-tag"
            onClick={() => allProps.removeBrand(brand?.id)}
          >
            {brand.name}
            <span className="remove-tag icon-close" />
          </span>
        ))}

        {filteredSuitable.map((suitable) => (
          <span
            key={suitable.id}
            className="filter-tag"
            onClick={() => allProps.removeSuitable(suitable?.id)}
          >
            {suitable.name}
            <span className="remove-tag icon-close" />
          </span>
        ))}

        {filteredIngredients.map((ingredient) => (
          <span
            key={ingredient.id}
            className="filter-tag"
            onClick={() => allProps.removeIngredients(ingredient?.id)}
          >
            {ingredient.name || ingredient.bname}
            <span className="remove-tag icon-close" />
          </span>
        ))}

        {filteredConcerns.map((concern) => (
          <span
            key={concern.id}
            className="filter-tag"
            onClick={() => allProps.removeConcerns(concern?.id)}
          >
            {concern.name}
            <span className="remove-tag icon-close" />
          </span>
        ))}
      </div>

      {isShowRemoveAll ? (
        <button
          id="remove-all"
          className="remove-all-filters text-btn-uppercase"
          onClick={allProps.clearFilter}
        >
          REMOVE ALL <i className="icon icon-close" />
        </button>
      ) : null}
    </div>
  );
}
