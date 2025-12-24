"use client";

import {
  availabilityOptions,
} from "@/data/productFilterOptions";
import RangeSlider from "react-range-slider-input";

export default function ProductFilterSidebar({ allProps, brands, categories, subCategories, concerns, suitable, ingredients }) {
  const {
    selectedSuitableIds = [],
    selectedConcernIds = [],
    selectedIngredientIds = [],
    selectedBrandIds = [],
    selectedSubCategoryIds = [],
    selectedCategoryIds = [],
  } = allProps;
  return (
    <div className="sidebar-filter canvas-filter left">
      <div className="canvas-wrapper">
        <div className="canvas-header d-flex d-xl-none">
          <h5>Filters</h5>
          <span className="icon-close close-filter" />
        </div>
        <div className="canvas-body">
          <div className="widget-facet facet-categories">
            <h6 className="facet-title">Categories</h6>
            <ul className="facet-content">
              {categories
                .filter(
                  (item, index, arr) =>
                    index === arr.findIndex((s) => s.id === item.id)
                )
                .map((category, index) => (
                  <li
                    key={`${category.id}-${index}`}
                  >
                    <a href="#" className={`categories-item ${selectedCategoryIds?.includes(String(category.id)) ? "active" : ""}`}
                      onClick={() => allProps.setCategory(category.name)}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          {subCategories?.length > 0 && (
            <div className="widget-facet facet-fieldset">
              <h6 className="facet-title">Sub Categories</h6>
              <div className="box-fieldset-item">
                {subCategories
                  .filter(
                    (item, index, arr) =>
                      index === arr.findIndex((s) => s.id === item.id)
                  )
                  .map((subCategory, index) => (
                    <fieldset
                      key={`${subCategory.id}-${index}`}
                      className="fieldset-item"
                      onClick={() => allProps.setSubCategories(subCategory.name)}
                    >
                      <input
                        type="checkbox"
                        name="subCategory"
                        className="tf-check"
                        readOnly
                        checked={selectedSubCategoryIds?.includes(String(subCategory.id))}
                      />
                      <label>
                        {subCategory.name}
                      </label>
                    </fieldset>
                  ))}
              </div>
            </div>
          )}
          <div className="widget-facet facet-price">
            <h6 className="facet-title">Price</h6>
            <RangeSlider
              min={10}
              max={100000}
              value={allProps.price}
              onInput={(value) => allProps.setPrice(value)}
            />
            <div className="box-price-product mt-3">
              <div className="box-price-item">
                <span className="title-price">Min price</span>
                <div
                  className="price-val"
                  id="price-min-value"
                >
                  {allProps.price[0]}
                </div>
              </div>
              <div className="box-price-item">
                <span className="title-price">Max price</span>
                <div
                  className="price-val"
                  id="price-max-value"
                >
                  {allProps.price[1]}
                </div>
              </div>
            </div>
          </div>
          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Brands</h6>
            <div className="box-fieldset-item">
              {brands
                .filter(
                  (item, index, arr) =>
                    index === arr.findIndex((s) => s.id === item.id)
                )
                .map((brand, index) => (
                  <fieldset
                    key={`${brand.id}-${index}`}
                    className="fieldset-item"
                    onClick={() => allProps.setBrands(brand.name)}
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      className="tf-check"
                      readOnly
                      checked={selectedBrandIds?.includes(String(brand.id))}
                    />
                    <label>
                      {brand.name}
                    </label>
                  </fieldset>
                ))}
            </div>
          </div>
          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Availability</h6>
            <div className="box-fieldset-item">
              {availabilityOptions.map((option, index) => (
                <fieldset
                  key={index}
                  className="fieldset-item"
                  onClick={() => allProps.setAvailability(option)}
                >
                  <input
                    type="radio"
                    name="availability"
                    className="tf-check"
                    readOnly
                    checked={allProps.availability === option}
                  />
                  <label>
                    {option.label}
                  </label>
                </fieldset>
              ))}
            </div>
          </div>
          {suitable?.length > 0 && (
            <div className="widget-facet facet-fieldset">
              <h6 className="facet-title">Suitable</h6>
              <div className="box-fieldset-item">
                {suitable
                  .filter(
                    (item, index, arr) =>
                      index === arr.findIndex((s) => s.id === item.id)
                  )
                  .map((suitable, index) => (
                    <fieldset
                      key={`${suitable.id}-${index}`}
                      className="fieldset-item"
                      onClick={() => allProps.setSuitable(suitable.name)}
                    >
                      <input
                        type="checkbox"
                        name="suitable"
                        className="tf-check"
                        readOnly
                        checked={selectedSuitableIds?.includes(String(suitable.id))}
                      />
                      <label>
                        {suitable.name}
                      </label>
                    </fieldset>
                  ))}
              </div>
            </div>
          )}
          {concerns?.length > 0 && (
            <div className="widget-facet facet-fieldset">
              <h6 className="facet-title">Concerns</h6>
              <div className="box-fieldset-item">
                {concerns
                  .filter(
                    (item, index, arr) =>
                      index === arr.findIndex((s) => s.name === item.name)
                  )
                  .map((concern, index) => (
                    <fieldset
                      key={`${concern.id}-${index}`}
                      className="fieldset-item"
                      onClick={() => allProps.setConcerns(concern.name)}
                    >
                      <input
                        type="checkbox"
                        name="concerns"
                        className="tf-check"
                        readOnly
                        checked={selectedConcernIds?.includes(String(concern.id))}
                      />
                      <label>
                        {concern.name}
                      </label>
                    </fieldset>
                  ))}
              </div>
            </div>
          )}
          {ingredients?.length > 0 && (
            <div className="widget-facet facet-fieldset">
              <h6 className="facet-title">Ingredients</h6>
              <div className="box-fieldset-item">
                {ingredients
                  .filter(
                    (item, index, arr) =>
                      index === arr.findIndex((s) => s.name === item.name)
                  )
                  .map((ingredient, index) => (
                    <fieldset
                      key={`${ingredient.id}-${index}`}
                      className="fieldset-item"
                      onClick={() => allProps.setIngredients(ingredient.name || ingredient.bname)}
                    >
                      <input
                        type="checkbox"
                        name="ingredients"
                        className="tf-check"
                        readOnly
                        checked={selectedIngredientIds?.includes(String(ingredient.id))}
                      />
                      <label>
                        {ingredient.name || ingredient.bname}
                      </label>
                    </fieldset>
                  ))}
              </div>
            </div>
          )}

        </div>
        <div className="canvas-bottom d-block d-xl-none">
          <button
            id="reset-filter"
            onClick={allProps.clearFilter}
            className="tf-btn btn-reset"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
