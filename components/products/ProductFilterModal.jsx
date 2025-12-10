"use client";

import { availabilityOptions } from "@/data/productFilterOptions";
import { useRouter } from "next/navigation";
import RangeSlider from "react-range-slider-input";

export default function ProductFilterModal({ allProps, brands, categories, subCategories, concerns, suitable, ingredients }) {
  const router = useRouter();
  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h5>Filters</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        <div className="canvas-body">
          <div className="widget-facet facet-categories">
            <h6 className="facet-title">Categories</h6>
            <ul className="facet-content">
              {categories?.map((category, index) => (
                <li key={index}>
                  <a href="#" className={`categories-item ${allProps.selectedCategory.includes(category.name) ? "active" : ""}`}
                    onClick={() => {
                      allProps.setCategory(category.name);
                      router.push(`/products?category=${category?.id}`);
                    }}
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
                {subCategories?.map((subCategory) => (
                  <fieldset
                    key={subCategory.id}
                    className="fieldset-item"
                    onClick={() => allProps.setSubCategories(subCategory.name)}
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      className="tf-check"
                      readOnly
                      checked={allProps.selectedSubCategories.includes(subCategory.name)}
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
                <div className="price-val" id="price-min-value" data-currency="Tzs">
                  {allProps.price[0]}
                </div>
              </div>
              <div className="box-price-item">
                <span className="title-price">Max price</span>
                <div className="price-val" id="price-max-value" data-currency="Tzs">
                  {allProps.price[1]}
                </div>
              </div>
            </div>
          </div>

          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Brands</h6>
            <div className="box-fieldset-item">
              {brands?.map((brand) => (
                <fieldset
                  key={brand.id}
                  className="fieldset-item"
                  onClick={() => allProps.setBrands(brand.name)}
                >
                  <input
                    type="checkbox"
                    name="brand"
                    className="tf-check"
                    readOnly
                    checked={allProps.selectedBrands.includes(brand.name)}
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
              {availabilityOptions?.map((option, index) => (
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
                {suitable?.map((suitable) => (
                  <fieldset
                    key={suitable.id}
                    className="fieldset-item"
                    onClick={() => allProps.setSuitable(suitable.name)}
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      className="tf-check"
                      readOnly
                      checked={allProps.selectedSuitable.includes(suitable.name)}
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
                {concerns?.map((concern) => (
                  <fieldset
                    key={concern.id}
                    className="fieldset-item"
                    onClick={() => allProps.setConcerns(concern.name)}
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      className="tf-check"
                      readOnly
                      checked={allProps.selectedConcerns.includes(concern.name)}
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
                {ingredients?.map((ingredient) => (
                  <fieldset
                    key={ingredient.id}
                    className="fieldset-item"
                    onClick={() => allProps.setIngredients(ingredient.name)}
                  >
                    <input
                      type="checkbox"
                      name="brand"
                      className="tf-check"
                      readOnly
                      checked={allProps.selectedIngredients.includes(ingredient.name)}
                    />
                    <label>
                      {ingredient.name}
                    </label>
                  </fieldset>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="canvas-bottom">
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
