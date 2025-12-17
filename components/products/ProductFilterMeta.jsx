import React from "react";

export default function ProductFilterMeta({ allProps, productLength }) {

  const isShowRemoveAll = allProps.availability != "All" ||
    allProps.selectedBrands.length ||
    allProps.selectedCategory.length ||
    allProps.selectedSuitable.length ||
    allProps.selectedIngredients.length ||
    allProps.selectedConcerns.length ||
    allProps.selectedSubCategories.length

  return (
    <div className="meta-filter-shop" style={{}}>
      <div id="product-count-grid" className="count-text">
        <span className="count">{productLength}</span> Products Found
      </div>

      <div id="applied-filters">
        {allProps.availability != "All" ? (
          <span
            className="filter-tag"
            onClick={() => allProps.setAvailability("All")}
          >
            {allProps.availability.label}
            <span className="remove-tag icon-close" />
          </span>
        ) : (
          ""
        )}
        {allProps.selectedCategory.length ? (
          <React.Fragment>
            {allProps.selectedCategory.map((category) => (
              <span
                key={category}
                className="filter-tag"
                onClick={() => allProps.removeCategory(category)}
              >
                {category}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
        {allProps.selectedSubCategories.length ? (
          <React.Fragment>
            {allProps.selectedSubCategories.map((subCategory) => (
              <span
                key={subCategory}
                className="filter-tag"
                onClick={() => allProps.removeSubCategories(subCategory)}
              >
                {subCategory}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
        {allProps.selectedConcerns.length ? (
          <React.Fragment>
            {allProps.selectedConcerns.map((concern) => (
              <span
                key={concern}
                className="filter-tag"
                onClick={() => allProps.removeConcerns(concern)}
              >
                {concern}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
        
        {allProps.selectedSuitable.length ? (
          <React.Fragment>
            {allProps.selectedSuitable.map((suitable) => (
              <span
                key={suitable}
                className="filter-tag"
                onClick={() => allProps.removeSuitable(suitable)}
              >
                {suitable}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}

        {allProps.selectedIngredients.length ? (
          <React.Fragment>
            {allProps.selectedIngredients.map((ingredient) => (
              <span
                key={ingredient}
                className="filter-tag"
                onClick={() => allProps.removeIngredients(ingredient)}
              >
                {ingredient}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
        {allProps.selectedBrands.length ? (
          <React.Fragment>
            {allProps.selectedBrands.map((brand) => (
              <span
                key={brand}
                className="filter-tag"
                onClick={() => allProps.removeBrand(brand)}
              >
                {brand}
                <span className="remove-tag icon-close" />
              </span>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}

      </div>
      {isShowRemoveAll ? (
        <button
          id="remove-all"
          className="remove-all-filters text-btn-uppercase"
          onClick={allProps.clearFilter}
        >
          REMOVE ALL <i className="icon icon-close" />
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
