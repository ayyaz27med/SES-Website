"use client";

import RangeSlider from "react-range-slider-input";

export default function ProductFilterModal({ allProps, products }) {
  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        {/* ---------------- Header ---------------- */}
        <div className="canvas-header">
          <h5>Filters</h5>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>

        {/* ---------------- Body ---------------- */}
        <div className="canvas-body">
          {/* Categories */}
          <div className="widget-facet facet-categories">
            <h6 className="facet-title">Product Categories</h6>
            <ul className="facet-content">
              {allProps.categories?.map((category, index) => (
                <li key={index}>
                  <a href="#" className={`categories-item`}>
                    {category.name} (
                    {products.filter((p) => p.category_id === category.id).length})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="widget-facet facet-price">
            <h6 className="facet-title">Price</h6>

            <RangeSlider
              min={0}
              max={1000000} // adjust max according to your products
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

          {/* Availability */}
          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Availability</h6>
            <div className="box-fieldset-item">
              {allProps.availabilityOptions?.map((option, index) => (
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
                    {option.label} (
                    {products.filter((p) => p.stock_status === option.value).length})
                  </label>
                </fieldset>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="widget-facet facet-fieldset">
            <h6 className="facet-title">Brands</h6>
            <div className="box-fieldset-item">
              {allProps.brandsList?.map((brand, index) => (
                <fieldset
                  key={index}
                  className="fieldset-item"
                  onClick={() => allProps.setBrands(brand.label)}
                >
                  <input
                    type="checkbox"
                    name="brand"
                    className="tf-check"
                    readOnly
                    checked={allProps.selectedBrands.includes(brand.label)}
                  />
                  <label>
                    {brand.label} (
                    {products.filter((p) => p.brand?.name === brand.label).length})
                  </label>
                </fieldset>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------- Reset Button ---------------- */}
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
