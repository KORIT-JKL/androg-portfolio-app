/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const productCard = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const imgContainer = css`
  width: 50%;
  height: 100%;
`;
const productImg = css`
  height: 100%;
  width: 100%;
`;
const inputContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
`;
const productName = css`
  font-size: 20px;
  width: 100%;
  height: 15px;
`;
const productNameContainer = css`
  display: flex;
  align-items: center;
  padding-left: 20px;
  width: 100%;
  height: 10%;
`;
const productPrice = css`
  width: 100%;
  height: 10%;
  font-size: 15px;
  top: 5px;
`;
const buttonContainer = css`
  height: 50px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const AdminProductsCard = ({ product, key }) => {
  const [putdata, setPutData] = useState({
    productName: "",
    productPrice: 0,
    categoryId: 0,
    productImg: "",
    colorId: 0,
  });
  const [modify, setModify] = useState(false);
  const productCardClickHandle = () => {
    setModify(true);
  };
  return (
    <>
      <div css={productCard}>
        <img css={productImg} src={product.productImg} alt="" />
        <div css={productNameContainer}>
          <div css={productName}>{product.productName}</div>
        </div>
        <div css={productNameContainer}>
          <div css={productPrice}>₩{product.productPrice}</div>
        </div>
      </div>
    </>
  );
};

export default AdminProductsCard;
