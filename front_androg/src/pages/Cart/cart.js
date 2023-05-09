/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from 'react';
import { useRecoilState } from "recoil";
import { cartIsOpenState } from "../../atoms/authAtoms";
const cartContainer =css`
    position: fixed;
    z-index: 999;
    background-color: #00000099;
    width: 100%;
    height: 100%;
`
const mainCartContainer =css`
    display: flex;
    flex-direction: column;
    float: right;
    height: 100%;
    width: 50%;
    background-color: white;
`
const header =css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dbdbdb;
`
const cartText =css`
    display: flex;
    align-items: center;
    margin: 20px;
    font-size: 20px;
    height: 50px;
    font-weight: 600;
    text-decoration: underline;

`
const closeButton =css`
    margin :10px;
    width: 40px;
    font-size: 30px;
    background-color: white;
    border: 0px;
`
const main =css`
    display: flex;
    flex-direction: column;
    height: 85%;
    border-bottom: 1px solid #dbdbdb;
    overflow-y: auto;
`
const mainProduct =css`
    display: flex;
    height: 200px;
    margin: 10px 0px;
`
const imgContainer = css`
    height: 200px;
    width: 30%;
`
const img =css`
    margin: 20px;
    height: 100%;
    width: 100%;
`
const detailContainer =css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    padding: 20px;
    padding-left: 40px;
`
const productName =css`
    height: 10%;
    margin: 10px 5px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dbdbdb;
`
const productOption =css`
    height: 15%;
    margin: 10px 5px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dbdbdb;
`
const productPrice =css`
    height: 25px;
    margin: 10px 5px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dbdbdb;
`
const productCount =css`
    height: 45%;
    margin: 10px 5px;
    display: flex;
    align-items: center;

`
const plusAndMinus =css`
    font-size: 20px;
    background-color: white;
    margin: 0px 5px;
    border: 1px solid #dbdbdb;
`
const CountButton =css`
    font-size: 20px;
    background-color: white;
    margin: 0px 5px;
    border: 1px solid black;
`
const space =css`
    height: 100px;
`
const deliveryText =css`
    padding: 10px;
    display: flex;
    margin-left: 20px;
`
const checkLists =css`
    display: flex;
    flex-direction: column;
    padding: 30px;
    
`

const checkList =css`
    display: flex;
    padding: 10px 0px;
`
const totalPriceContainer =css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    margin-left: 20px;
    padding-right: 50px;
`
const totalPriceText = css`
    font-size: 15px;
`
const footer =css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
`
const shoppingButton =css`
    height: 80px;
    width: 350px;
    margin: 10px;
    background-color: white;
    font-weight: 600;
    font-size: 17px;
    &:hover {
        background-color: grey;
        color: white;
    }
`
const payButton =css`
    height: 80px;
    width: 350px;
    margin: 10px;
    font-size: 17px;
    font-weight: 600;
`
const Cart = () => {
    const [ count , setCount ] = useState(0);
    const [ cartIsOpen , setCartIsOpen] = useRecoilState(cartIsOpenState);
    const cartClose = () => {
        setCartIsOpen(false);
    }
    const countplus = (count) => {
        setCount(count+1);
        console.log(count);
    }
    const countminus = (count) => {
        setCount(count-1);
        console.log(count);
    }
    useEffect(() => {
        document.body.style= `overflow: hidden`;
        return () => document.body.style = `overflow: auto`
      }, [])
      
    return (
        
        <div css ={cartContainer}>
            <div css={mainCartContainer}>
                <div css={header}>
                    <div css={cartText}>장바구니</div>
                    <button onClick={() => cartClose()} css={closeButton}>X</button>
                </div>
                <div css={main}>
                    <div css={mainProduct}>
                        <div css={imgContainer}>
                            <img css={img} src="//cdn.shopify.com/s/files/1/0099/5708/1143/products/115669_BONE_1.jpg?v=1683049243&width=480" alt="" />
                        </div>
                        <div css={detailContainer}>
                            <div css={productName}>
                                PYTHON REVERSIBLE VEST
                            </div>
                            <div css={productOption}>
                                BLACK / M
                            </div>
                            <div css={productPrice}>
                                ₩{296000*count}
                            </div>
                            <div css={productCount}>
                                <button css={plusAndMinus} onClick={() => countminus(count)}>-</button>
                                <button css={CountButton}>{count}</button>
                                <button css={plusAndMinus} onClick={() => countplus(count)}>+</button>
                            </div>
                        </div>
                    </div>
                    {/* 여기까지가 살 물품들 */}
                    <div css={space}></div>

                        <div css= {deliveryText}>배송비는 다음 단계에서 적용됩니다.</div>
                        <div css= {deliveryText}>10만원 이상 구매 시 무료배송 / 제외가 적용 됩니다.</div>
                    <div css={checkLists}>
                        <div css={checkList}>
                            <input type="checkbox"></input>
                            <div>개인정보 수집 및 이용 동의</div>
                        </div>
                        <div css={checkList}>
                            <input type="checkbox"></input>
                            <div>이용약관 동의</div>
                        </div>
                    </div>
                    <div css={totalPriceContainer}>
                        <div css={totalPriceText}>총 가격</div>
                        <div>₩99999999</div>
                    </div>

                </div>
                <div css={footer}>
                    <button onClick={() => cartClose()} css={shoppingButton}>쇼핑 계속하기</button>
                    <button css={payButton}>결제하기</button>
                </div>
            </div>
            
        </div>
    );
};

export default Cart;