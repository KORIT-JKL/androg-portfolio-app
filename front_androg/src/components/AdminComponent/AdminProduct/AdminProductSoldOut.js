/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { Mutation, useQuery } from "react-query";
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
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  margin: 0px 100px;
  padding-bottom: 150px;
`;
const productTable = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 170px;
  height: 200px;
  padding: 10px 20px;
`;
const textContainer = css`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const productNameText = css`
  font-size: 15px;
`;
const productImgText = css`
  font-size: 15px;
  height: 100px;
  object-fit: cover;
`;
const soldoutSelect = css`
  height: 30px;
  width: 100%;
`;
const AdminProductSoldOut = () => {
  const [selectCategoryId, setSelectCategoryId] = useState(1);
  const [products, setThisProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [colors, setColors] = useState([]);
  const searchProducts = useQuery(
    ["searchProducts"],
    async () => {
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get(`http://15.165.181.187/admin/products/${selectCategoryId}`, option);

      return response;
    },
    {
      enabled: selectCategoryId !== 0 && refresh,
      onSuccess: (response) => {
        setThisProducts(response.data);
        setRefresh(false);
      },
    }
  );
  const setcategoryIdClick = (e) => {
    setSelectCategoryId(e);
    setRefresh(true);
  };
  const soldout = async (productId, value) => {
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
      params: {
        productId: productId,
        value: value,
      },
    };
    const response = await axios.put(`http://15.165.181.187/admin/products/soldout`, "", option);
    setRefresh(true);
    return response;
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
        {products != null &&
          products.map((product) => (
            <div css={productTable}>
              <div css={textContainer}>
                <div css={productNameText}>{product.productName}</div>
              </div>

              <img css={productImgText} alt="" src={product.productImg}></img>
              <select
                css={soldoutSelect}
                value={product.soldoutFlag}
                onChange={(e) => soldout(product.productId, e.target.value)}
              >
                <option key={7} value={1}>
                  판매중
                </option>
                <option key={8} value={0}>
                  품절
                </option>
              </select>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminProductSoldOut;
