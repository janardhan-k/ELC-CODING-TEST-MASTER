/**
 * This file will hold the code for each Product flex, this is all rendered using a React Component...
 * 
 */
import React, { useState } from 'react';

const ProductItem = ({item}) => {
    return (
        <div class="product" key={item.id}>
            <img src={item.picture} alt={item.name}/>
            <h3>{item.name}</h3>
            <p>{item.about}</p>
        </div>
    );
}

export default ProductItem;