/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import CommonAdminHeader from "../../CommonHeader/CommonAdminHeader/CommonAdminHeader";
import CommonFooter from "../../CommonFooter/CommonFooter";
import { useRecoilState } from "recoil";
import { AdminMenuSelect } from "../../../atoms/Admin/AdminAtoms";
import { useQuery } from "react-query";
import axios from "axios";
const container = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 400px;
  width: 600px;
`;
const containerHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 300px;
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
  height: 300px;
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
  justify-content: center;
  flex-direction: column;
  height: 200px;
  width: 100%;
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
`;
const AdminProductRegister = () => {
  const [colors, setColors] = useState([]);
  const [productsDetails, setProductsDetatils] = useState({
    productName: "",
    productPrice: 0,
    categoryId: 0,
    productImg: "",
    colorName: "",
  });
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
        console.log(response.data);
      },
    }
  );
  if (getColor.isLoading) {
    return <>로딩중</>;
  }
  return (
    <div>
      <div css={container}>
        <div css={containerHeader}>
          <input css={productNameInput} type="text" placeholder="상품이름" />
          <input css={productPriceInput} type="text" placeholder="상품가격(원)" />
        </div>
        <div css={containerMiddle}>
          <select css={productCategoryInput} name="Category" id="categoryId">
            <option value="1">TEES</option>
            <option value="2">SWEATS</option>
            <option value="3">PANTS</option>
            <option value="4">OUTER</option>
            <option value="5">HEADWEAR</option>
            <option value="6">SHOES</option>
          </select>
          <select css={productColorInput} name="Color" id="colorId">
            {colors.map((color) => (
              <option key={color.id} value={color.id}>
                {color.colorName}
              </option>
            ))}
          </select>
        </div>
        <div css={containerFooter}>
          <input css={productUrlInput} type="text" placeholder="이미지URL" />
          <button css={registerButton}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductRegister;
