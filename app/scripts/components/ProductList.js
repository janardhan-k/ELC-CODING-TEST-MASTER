/**
 * This file will hold the Products flex, this is all rendered using a React Component...
 * 
 */
import React, { useState } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({items}) => {
    return items.length ? (
        <div class="product-grid">
                {items.map((item) => (
                    <ProductItem item={item} />
                ))}
        </div> 
    ): <div></div>
}

export default ProductList;

