/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { setRefresh, setSearchInput } from '../../atoms/authAtoms';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import axios from "axios";
import ProductsCard from "./productsCard";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import QueryString from "qs";
import { setPage, setProducts } from "../../atoms/Auth/AuthAtoms";
const container= css`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    padding-top: 100px;
`
const productCardContainer = css`
    display: flex;
    flex-wrap: wrap;
    height: auto;
    width: 80%;
    justify-content: flex-start;
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
    const [products , setThisProducts] = useRecoilState(setProducts)
    const [ searchInput , setThisserachInput ] = useRecoilState(setSearchInput);
    const [page , setThisPage ] =useRecoilState(setPage);
    const [searchParams , setSearchParams] = useState({"searchInput" : searchInput , "page" : page})
    const [lastPage, setlastPage] = useState(1);
    const lastProductRef = useRef();
    useEffect(() => {
        const observerService = (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setThiRefresh(true);
            }
          });
        };
        const observer = new IntersectionObserver(observerService, { threshold: 1 });
        observer.observe(lastProductRef.current);
      }, []);
      const option = {
        params: {
          searchParams: searchParams
        },
        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: "repeat" })
      };
    const searchProducts = useQuery(
        ["searchProducts"], async () => {

            
                const response = await axios.get("http://localhost:8080/products/search",option);
                console.log(response)
                setThiRefresh(false);
                return response

        },
        {   
            enabled : refresh && (option.params.searchParams.page < lastPage + 1 || lastPage === 0),
            onSuccess : (response) => {

                const totalCount = response.data.productTotalCount;
                setThisProducts([...products, ...response.data.productList]);
                setlastPage(totalCount % 20 === 0 ? totalCount / 20 : Math.ceil(totalCount / 20));
                setThisPage(option.params.searchParams.page +1);
                setSearchParams({ ...searchParams, page: page + 1 });
                console.log(searchParams)
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
                <div ref={lastProductRef}></div>
                
            </div>
        <CommonFooter />
        </div>
    );
};

export default SearchProducts;