import React from "react";

export default function ProductDescription({ product }) {

  const subCategories = product?.sub_category.map(c => c.name).join(", ");
  const concerns = product?.concerns.map(c => c.name).join(", ");
  const ingredients = product?.ingredients.map(c => c.bname).join(", ");
  const suitable = product?.suitable.map(c => c.name).join(", ");
  
  return (
    <>
      <div className="right">
        <div className="letter-1 text-btn-uppercase mb_12">
          Product Description
        </div>
        <p className="mb_12 text-secondary">
          {product?.descr}
        </p>
      </div>
      <div className="left">
        <div className="letter-1 text-btn-uppercase mb_12">
          What you need to know
        </div>
        <ul className="list-text type-disc mb_12 gap-6">
          <li className="font-2">
            Product type: {subCategories}
          </li>
          <li className="font-2">Concerns: {concerns}</li>
          <li className="font-2">Ingredients: {ingredients}</li>
          <li className="font-2">Suitability: {suitable}</li>
        </ul>
      </div>
    </>
  );
}
