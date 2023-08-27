import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ProductsContext } from '../../context/Product.context';
import ProductCard from '../../components/productCard/ProductCard';
import "./shop.scss"

const ShopPreview = () => {
    const {title} = useParams();
    const {products} =useContext(ProductsContext)
    const productsForTitle = products[title];

    return (
        <div className='products-container'>
            {productsForTitle && productsForTitle.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ShopPreview