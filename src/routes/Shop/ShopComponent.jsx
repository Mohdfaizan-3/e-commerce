import React, { Fragment, useContext } from "react";
import { ProductsContext } from "../../context/Product.context";
import Preview from "../Home/Category/category-preview/Preview";
import "./shop.scss";
const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <Fragment>
      {Object.keys(products).map((title) => {
        const product = products[title];
        return <Preview key={title} title={title} products={product} />;
      })}
    </Fragment>
  );
};

export default Shop;
