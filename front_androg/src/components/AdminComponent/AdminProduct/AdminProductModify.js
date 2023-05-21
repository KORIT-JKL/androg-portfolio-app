/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import AdminProductsCard from "./AdminProductCard";
const categoryIdContainer = css`
  display: flex;
  width: 1500px;
  height: 100px;
  justify-content: center;
  text-align: center;

  margin: auto;
  padding: 20px;
`;
const categoryList = css`
  width: 100px;
  height: 100%;
  margin: auto;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 25px;
  cursor: pointer;
`;

const container = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  margin: auto;
`;
const productCardContainer = css`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  margin: auto;
  width: 1500px;
  justify-content: flex-start;
`;
const productCard = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 430px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    background-color: #dbdbdb90;
  }
  &:active {
    background-color: #fafafa;
  }
`;

const AdminProductModify = () => {
  const [categoryId, setCateogyrId] = useState(0);
  const [products, setThisProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modify, setModify] = useState(false);
  const searchProducts = useQuery(
    ["searchProducts"],
    async () => {
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get(`http://localhost:8080/admin/products/${categoryId}`, option);

      return response;
    },
    {
      enabled: categoryId !== 0 && refresh,
      onSuccess: (response) => {
        console.log(response);
        setThisProducts(response.data);
        setRefresh(false);
      },
    }
  );
  const navigate = useNavigate();
  const ProductsCardClick = (productId) => {};
  const setcategoryIdClick = (e) => {
    setCateogyrId(e);
    setRefresh(true);
  };
  return (
    <div>
      <ul css={categoryIdContainer}>
        <li css={categoryList} key={1} onClick={() => setcategoryIdClick(1)}>
          TEES
        </li>
        <li css={categoryList} key={2} onClick={() => setcategoryIdClick(2)}>
          SWEATS
        </li>
        <li css={categoryList} key={3} onClick={() => setcategoryIdClick(3)}>
          PANTS
        </li>
        <li css={categoryList} key={4} onClick={() => setcategoryIdClick(4)}>
          OUTER
        </li>
        <li css={categoryList} key={5} onClick={() => setcategoryIdClick(5)}>
          HEADWEAR
        </li>
        <li css={categoryList} key={6} onClick={() => setcategoryIdClick(6)}>
          SHOES
        </li>
      </ul>
      <div css={container}>
        <ul css={productCardContainer}>
          {products.length > 0
            ? products.map((product) =>
                modify ? (
                  <li css={productCard} onClick={() => setModify(false)}>
                    <productCard product={product} key={product.productId} />
                  </li>
                ) : (
                  <li css={productCard} onClick={() => setModify(true)}>
                    <AdminProductsCard product={product} key={product.productId} />
                  </li>
                )
              )
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default AdminProductModify;
