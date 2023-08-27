import { createContext, useEffect, useState } from "react";
import { getCategoriesFromDoc } from "../utils/firebase/firebase";

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState({});
  const value = { products };

  useEffect(() => {
    const getCategoriesData = async () => {
      const data = await getCategoriesFromDoc();
      setProducts(data);
    };
    getCategoriesData();
  }, []);

  return (
    <>
      <ProductsContext.Provider value={value}>
        {children}
      </ProductsContext.Provider>
    </>
  );
};
