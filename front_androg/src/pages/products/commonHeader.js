/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import impact from '../../img/tutle.jpg';
import CommonFooter from './commonFooter';
import Cart from "../Cart/cart";
import { useRecoilState } from "recoil";
import { cartIsOpenState } from "../../atoms/authAtoms";
import ProductDetails from "./productDetails";
import Products from "./products";
const header =css`
    position: fixed;
    flex-direction: column;
    display: flex;
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
`
const mainHeader = css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    background-color: white;
`;

const headerList = css`
    display: flex;
    align-items: center;
    width: 1400px;
    margin-left: 30px;

`;

const headerList2 = css`
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 50px;
`;

const list = css`
    padding: 0px 10px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
        /* text-decoration: underline; */

    }
`;

const img = css`

    width: 70px;
    height: 50px;
`
const subHeader =css`
    display: flex;
    width: 100%;
    height: 50px;
    background-color: white;
`;
const subHeaderList =css`
    display: flex;
    margin-left: 100px;
    align-items: center;

`
const sublist =css`
    padding-left: 10px;
    padding-right: 60px;
    font-size: 15px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`
const test = css`
    height: 3000px;
`
const CommonHeader = () => {
    const [sbheader , setsbheader] = useState(true);
    const [ cartIsOpen , setCartIsOpen] = useRecoilState(cartIsOpenState);
    return (
        <>
        {cartIsOpen ? <Cart /> : ""}
        
        <div css={header}>
            <div css={mainHeader}>
                    <img src={impact} alt="logo" css={img}/>
                    <ul css={headerList}>
                        <li css={list} onMouseOver={() => setsbheader(true)}>SHOP</li>
                        <li css={list} onMouseOver={() => setsbheader(false)}>SUPPORT</li>
                    </ul>       
                    <ul css={headerList2}>
                        <li css={list}>SEARCH</li>
                        <li css={list} onClick={() => setCartIsOpen(true)}>BAG</li>
                    </ul>
            </div>
            <div css={subHeader}>
                {sbheader ? 
                <ul css={subHeaderList}>
                    <li css={sublist}>tees</li>
                    <li css={sublist}>swaets</li>
                    <li css={sublist}>outerwear</li>
                    <li css={sublist}>pants</li>
                    <li css={sublist}>headwear</li>
                    <li css={sublist}>shoes</li>
                    <li css={sublist}>all</li>
                </ul>    
                : <ul css={subHeaderList}>
                    <li css={sublist}>NOTICE</li>
                    <li css={sublist}>CUSTOMER SUPPORT</li>
                    <li css={sublist}>SHIPPING & RETURNS</li>
                    <li css={sublist}>SIZE GUIDE</li>
                    <li css={sublist}>LEGAL</li>
                </ul>   
            }
            </div>
            
        </div>
        {/* <div css={test}>

        </div> */}
        <ProductDetails />
        {/* <Products /> */}
        <CommonFooter />
        </>
    );
};

export default CommonHeader;