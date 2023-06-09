/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const productCard = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const productImg = css`
  height: 80%;
  width: 100%;
`;
const productName = css`
  font-size: 20px;
  width: 100%;
  height: 15px;
`;
const productNameContainer = css`
  display: flex;
  justify-content: space-between;
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
const ProductsCard = ({ product }) => {
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

export default ProductsCard;
