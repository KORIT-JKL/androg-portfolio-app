/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
const container = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 500px;
  width: 600px;
`;
const containerHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 100%;
`;
const productNameInput = css`
  width: 200px;
  height: 30px;
  margin: 0px 30px;
`;
const productPriceInput = css`
  width: 200px;
  height: 30px;
  margin: 0px 30px;
`;
const containerMiddle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  width: 100%;
`;
const productCategoryInput = css`
  width: 200px;
  height: 30px;
  margin: 0px 30px;
`;
const productColorInput = css`
  width: 200px;
  height: 30px;
  margin: 0px 30px;
`;
const containerFooter = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 500px;
  width: 100%;
`;
const img = css`
  height: 200px;
  width: 150px;
`;
const productUrlInput = css`
  width: 540px;
  height: 30px;
`;
const registerButton = css`
  height: 100px;
  width: 100px;
  background-color: white;
  border: 1px solid black;
  border-radius: 7px;
  margin: 10px;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
`;
const AdminProductRegister = () => {
  const [colors, setColors] = useState([]);
  const [productsDetails, setProductsDetatils] = useState({
    productName: "",
    productPrice: 0,
    categoryId: 1,
    productImg: "",
    colorId: 1,
  });
  const [register, setRegister] = useState(false);
  const getColor = useQuery(
    ["getAllColor"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      // 전체 색상 들고오기
      const response = axios.get("http://localhost:8080/admin/products/colors", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setColors(response.data);
      },
    }
  );
  const productNameInputHandle = (e) => {
    setProductsDetatils({ ...productsDetails, productName: e.target.value });
  };

  const productPriceInputHandle = (e) => {
    setProductsDetatils({ ...productsDetails, productPrice: e.target.value });
  };
  const productCategorySelectHandle = (e) => {
    setProductsDetatils({ ...productsDetails, categoryId: e.target.value });
  };
  const productColorSelectHandle = (e) => {
    setProductsDetatils({ ...productsDetails, colorId: e.target.value });
  };
  const productImgUrlInputHandle = (e) => {
    setProductsDetatils({ ...productsDetails, productImg: e.target.value });
  };
  const registerProductsDetails = async () => {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/product/register",
        JSON.stringify(productsDetails),
        option
      );
      alert("등록되었습니다.");
      return response;
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  if (getColor.isLoading) {
    return <>로딩중</>;
  }
  return (
    <div>
      <div css={container}>
        <div css={containerHeader}>
          <input css={productNameInput} onChange={productNameInputHandle} type="text" placeholder="상품이름" />
          <input css={productPriceInput} onChange={productPriceInputHandle} type="text" placeholder="상품가격(원)" />
        </div>
        <div css={containerMiddle}>
          <select css={productCategoryInput} onChange={productCategorySelectHandle} name="Category" id="categoryId">
            <option key={1} value="1">
              TEES
            </option>
            <option key={2} value="2">
              SWEATS
            </option>
            <option key={3} value="3">
              PANTS
            </option>
            <option key={4} value="4">
              OUTER
            </option>
            <option key={5} value="5">
              HEADWEAR
            </option>
            <option key={6} value="6">
              SHOES
            </option>
          </select>
          <select css={productColorInput} onChange={productColorSelectHandle} name="Color" id="colorId">
            {colors.map((color) => (
              <option key={color.id} value={color.colorId}>
                {color.colorName}
              </option>
            ))}
          </select>
        </div>
        <div css={containerFooter}>
          {productsDetails.productImg != "" ? <img css={img} src={productsDetails.productImg} alt="" /> : <></>}

          <input css={productUrlInput} onChange={productImgUrlInputHandle} type="text" placeholder="이미지URL" />
          {productsDetails.productName == "" ||
          productsDetails.productPrice == 0 ||
          productsDetails.categoryId == 0 ||
          productsDetails.productImg == "" ||
          productsDetails.colorId == 0 ? (
            <button css={registerButton}>전부 입력시 등록가능</button>
          ) : (
            <button css={registerButton} onClick={() => registerProductsDetails()}>
              등록
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProductRegister;
