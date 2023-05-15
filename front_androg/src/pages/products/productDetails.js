/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { setRefresh } from "../../atoms/Auth/AuthAtoms";
import { useRecoilState } from "recoil";
const container = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1500px;
    height: 100%;
    margin: auto;
`
const imgContainer =css`
    margin: 20px;
    padding-top: 100px;
    width: 50%;
    height: 100%;
    
`
const img = css`
    width: 100%;
    height: 900px;
`
const detailsContainer =css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 30%;
    height: 100%;
    margin: 100px 20px;
    padding-left: 30px;
    
`
const detailTop =css`
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: left;
`
const productName = css`
    font-size: 30px;
    font-weight: 600;
    
`

const productPrice = css`
    font-size: 15px;
    padding: 10px;
`
const sizeContainer = css`
    display : flex;
    padding: 10px;
    width: 100%;
    border-top: 1px solid #dbdbdbff;
    border-bottom: 1px solid #dbdbdbff;
`
const productSize = css`
    font-size: 20px;
    padding: 5px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`
const detailBottom = css`
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 100%;
    padding: 20px 0px;
    border-bottom: 1px solid #dbdbdbff;
`
const delivery = css`
    font-size: 15px;
`
const shippingContainer =css`
    display: flex;
    justify-content: left;
    flex-direction: column;
    width: 100%;
    margin: 10px;
`
const buttonList = css`
    position: fixed;
    display: flex;
    z-index: 99;
    height: 50px;
    width: 700px;
    left: 59%;
    top: 85%;
    margin: 10px;
`
const addCartText =css`
    height: 100%;
    width: 30%;
    margin: 5px;
    background-color: black;
    font-size: 20px;
    font-weight: 300;
    color: white;
    cursor: pointer;
    transition: 0.75s ;
    &:hover{
        background-color: grey;
    }

`
const directBuyText =css`
    height: 100%;
    width: 30%;
    margin: 5px;
    background-color: white;
    font-size: 20px;
    font-weight: 300;
    color: black;
    cursor: pointer;
    transition: 0.75s ;
    &:hover{
        background-color: black;
        color: white;
    }
`
const shippingText =css`
    font-size: 17px;
    cursor: pointer;
    margin-bottom: 15px ;
    &:hover {
        font-weight: 600;
    }
    
`
const shippingSubText =css`
    padding: 10px 0px;
    font-size : 15px;
    border-top: 1px solid #dbdbdbff;
    transition: 1s ;
    
`
const ProductDetails = () => {
    
    const [refresh , setThiRefresh ] = useRecoilState(setRefresh);
    const [ product , setProduct ] = useState();
    const [ shippingIsOpen , setShippingIsOpen] = useState(false);
    const [ size , setSize] = useState(null);
    const { productId } = useParams();
    const shippingClickHandle = () =>{
        if(shippingIsOpen){
            setShippingIsOpen(false)
        }else {
            setShippingIsOpen(true)
        }
    }
    const getProduct = useQuery(["getProduct"], async () => {
        const reponse = await axios.get(`http://localhost:8080/products/${productId}/details`);
        return reponse;
    },{
        enabled : refresh,
        onSuccess : (response) => {
            console.log(response);
            setProduct(response.data);
        }
    })
    if (!product) {
        return setThiRefresh(true); 
    }
    const sizeClick = (e) =>{
        setSize(e.target.textContent)
        console.log(size);
    }
    return (
        <>
        <CommonHeader  />
        <div css={container}>
            
            <div css={imgContainer}>
                <img css={img} src={product.productImg} alt="productImg" />
            </div>
            <div css={detailsContainer}>
                <div css={detailTop}>
                    <h1 css={productName}>{product.productName}</h1>
                    <div css={productPrice}>₩{product.productPrice}</div>
                </div>
                <div css={sizeContainer}>
                    {/* 카테고리아이디 별로 사이즈 출력 */}
                    {product.category.categoryId <= 4 ? 
                        <>
                            <div css={productSize} onClick={sizeClick}>S</div>
                            <div css={productSize}>M</div>
                            <div css={productSize}>L</div>
                            <div css={productSize}>XL</div>
                            <div css={productSize}>XXL</div>
                        </>
                        : product.category.categoryId === 6 ?
                        <>
                             <div css={productSize}>240</div>
                            <div css={productSize}>250</div>
                            <div css={productSize}>260</div>
                            <div css={productSize}>270</div>
                            <div css={productSize}>280</div>
                        </>
                        : 
                        <>  
                            <div css={productSize}>oneSize</div>
                           
                        </>
                        }
                </div>
                <div css={detailBottom}>
                    <div css={delivery}>10만원 이상 결제시 무료배송</div>
                </div>
                <div css={shippingContainer}>
                    <div onClick={shippingClickHandle} css={shippingText}>택배회사 </div>
                    {shippingIsOpen ? 
                    <>
                        <div css={shippingSubText}>&#62;ㅁㅁ택배 (1234-5678) </div>
                    </> 
                    :""
                }
                </div>
            </div>
                <div css={buttonList}>
                    <button css={addCartText}>장바구니에 담기</button>
                    <button css={directBuyText}>바로구매</button>
                </div>
        </div>
        <CommonFooter />
        </>
    );
};

export default ProductDetails;