/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
const container= css`
    display: flex;
    width: 100%;
    height: 100%;
    
    justify-content: center;
    margin: auto;
    padding-top: 100px;
`
const productCardContainer = css`
    display: flex;
    flex-wrap: wrap;
    height: auto;
    width: 80%;
    justify-content: center;
`
const productCard = css`
    display: flex;
    
    width: 300px;
    height: 430px;
    padding: 10px;
`
const productImg =css`
    height: 80%;
    width: 100%;
`
const Products = () => {
    return (
        <div css={container}>
            <ul css={productCardContainer}>
                <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li>
                <li css={productCard}>
                    {/* <Products /> */}
                </li>
                {/* <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li>
                <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li>
                <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li>
                <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li>
                <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li>
                <li css={productCard}>
                    <img css={productImg} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt=""/>

                </li> */}

            </ul>
        </div>
    );
};

export default Products;