import React from "react";
import CategoryItem from "../Items/CategoryItem";
import "./category.styles.scss";

const Category = ({ categories }) => {
  return (
    <div className="category-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Category;
