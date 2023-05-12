/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { setRefresh, setSearchInput } from '../../atoms/authAtoms';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import axios from "axios";
import ProductsCard from "./productsCard";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
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

const SearchProducts = () => {
    const [refresh , setThiRefresh ] = useRecoilState(setRefresh);
    const [products , setProducts] = useState([])
    const [ searchInput , setThisserachInput ] = useRecoilState(setSearchInput);

    const searchProducts = useQuery(
        ["searchProducts"], async () => {
            const option = {
                params:{
                    searchInput : searchInput
                } 
                
              };
            // console.log(option)
                console.log(option)
                const response = await axios.get("http://localhost:8080/products/search",option);
                setThiRefresh(false);
                console.log(response);
                return response
            
           
            
        },
        {   
            enabled : refresh,
            onSuccess : (response) => {
                setProducts(response.data);
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

export default SearchProducts;