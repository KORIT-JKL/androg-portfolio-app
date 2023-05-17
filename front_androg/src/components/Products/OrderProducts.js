/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const orderbox = css`
  width: 1030px;
  height: 720px;
  overflow-y: auto;
`;

const orderDetailBox = css`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 10px 0px 10px 2px;
  padding: 5px;
  width: 70%;
  height: 200px;
`;

const orderImgBox = css`
  padding: 5px;
  width: 30%;
  height: 100%;
  overflow: hidden;
`;

const orderImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const orderInfoBox = css`
  padding: 5px;
  width: 35%;
  height: 100%;
`;

const productName = css`
  margin-top: 5px;
  font-size: 25px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const orderInfoText = css`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const reviewButtonBox = css`
  padding: 5px;
  width: 30%;
  height: 100%;
`;

const reviewButton = css`
  font-weight: 600;
  font-size: 17px;
  height: 100%;
  width: 100%;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: white;
  }
`;

const OrderProducts = ({ orderProduct, isOpen }) => {
  const navigate = useNavigate();
  const reviewClickHandle = (orderProduct) => {
    navigate(`/product/${orderProduct.productId}/review`);
  };

  return (
    <div css={orderDetailBox}>
      <div css={orderImgBox}>
        <img css={orderImg} src={orderProduct.productImg} alt={orderProduct.productName} />
      </div>
      <div css={orderInfoBox}>
        <h2 css={productName}>{orderProduct.productName}</h2>
        <p css={orderInfoText}>
          옵션 : {orderProduct.colorName}/{orderProduct.sizeName} <br />
        </p>
        <p css={orderInfoText}>
          수량 : {orderProduct.countNumber} <br />
        </p>
        <p css={orderInfoText}>가격 : ₩ {orderProduct.productPrice}</p>
      </div>
      <div css={reviewButtonBox}>
        {isOpen ? (
          <button css={reviewButton} onClick={() => reviewClickHandle(orderProduct)}>
            리뷰 등록
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default OrderProducts;
