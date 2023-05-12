/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useQuery } from "react-query";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import { useNavigate, useParams } from "react-router-dom";
import ProductsCard from './productsCard';
import { useRecoilState } from "recoil";
import { setRefresh } from "../../atoms/authAtoms";
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
    flex-direction: column;
    width: 300px;
    height: 430px;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    &:hover{
        background-color: #dbdbdb90;
    }
    &:active{
        background-color: #fafafa;
    }
`

const Products = () => {

    const {categoryId} = useParams();
    const [refresh , setThiRefresh ] = useRecoilState(setRefresh);
    const [products , setProducts] = useState([])


    const searchProducts = useQuery(
        ["searchProducts"], async () => {
            console.log(categoryId);
            const reponse = await axios.get(`http://localhost:8080/category/${categoryId}`);
            return reponse
            
        },
        {
            enabled : refresh,
            onSuccess : (response) => {
                console.log(response);
                setProducts(response.data);
                setThiRefresh(false);
            }
        }
    )
    const navigate = useNavigate();
    const ProductsCardClick = (productId) => {
        navigate(`/products/${productId}/details`);
    }

    return (
        <div>
            <CommonHeader  />
            <div css={container}>
                <ul css={productCardContainer}>
                    {products.length > 0 ? products.map((product) => 
                    <>
                        <li css={productCard} onClick={() => ProductsCardClick(product.productId)} >
                            <ProductsCard  product ={product} key={product.productId}/>
                        </li > 
                    </>)
                        : ""}

                </ul>
            </div>
        <CommonFooter />
        </div>
    );
};

export default Products;