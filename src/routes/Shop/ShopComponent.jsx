import React, { useContext } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { ProductsContext } from "../../context/Product.context";
import "./shop.scss";
const Shop = () => {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
