/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import AdminProductsCard from "./AdminProductCard";
import ProductsCard from "../../../pages/products/productsCard";
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
  justify-content: center;
  margin: auto;
`;
const productCardContainer = css`
  display: flex;
  flex-wrap: wrap;
  height: auto;
  margin: auto;
  width: 1000px;
  justify-content: flex-start;
`;
const deleteButton = css`
  position: relative;
  display: flex;
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 50px;
  left: 250px;
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
const modifyCardCotainer = css`
  display: flex;
  height: 100%;
  width: 300px;
  background-color: white;
`;

const modifyCard = css`
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 480px;
  width: 300px;
  top: 200px;
  right: 150px;
  border: 1px solid black;
  background-color: white;
`;

const productNameInput = css`
  width: 250px;
  height: 30px;
  margin: 10px 30px;
`;
const productPriceInput = css`
  width: 250px;
  height: 30px;
  margin: 10px 30px;
`;

const productCategoryInput = css`
  width: 250px;
  height: 30px;
  margin: 10px 30px;
`;
const productColorInput = css`
  width: 250px;
  height: 30px;
  margin: 10px 30px;
`;

const img = css`
  margin-left: 80px;
  height: 200px;
  width: 150px;
`;
const productUrlInput = css`
  width: 250px;
  height: 30px;
  margin: 10px 30px;
`;

const buttonList = css`
  display: flex;
  justify-content: space-between;
  height: auto;
  width: 100%;
  padding: 5px 30px;
`;
const buttons = css`
  border: 1px solid black;
  width: 100px;
  height: 40px;
  margin: 0px 5px;
  background-color: white;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const AdminProductModify = () => {
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [products, setThisProducts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [colors, setColors] = useState([]);
  const [productsDetails, setProductsDetatils] = useState({
    productId: 0,
    productName: "",
    productPrice: 0,
    categoryId: 0,
    productImg: "",
    colorId: 0,
  });

  const searchProducts = useQuery(
    ["searchProducts"],
    async () => {
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get(`http://localhost:8080/admin/products/${selectCategoryId}`, option);

      return response;
    },
    {
      enabled: selectCategoryId !== 0 && refresh,
      onSuccess: (response) => {
        console.log(response);
        setThisProducts(response.data);
        setRefresh(false);
      },
    }
  );
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
  const productCartClick = (product) => {
    setProductsDetatils({
      ...productsDetails,
      productId: product.productId,
      productName: product.productName,
      productPrice: product.productPrice,
      categoryId: product.categoryId,
      colorId: product.colorId,
      productImg: product.productImg,
    });
    setRefresh(true);
    console.log(productsDetails);
  };

  const setcategoryIdClick = (e) => {
    setSelectCategoryId(e);
    setRefresh(true);
  };
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
    console.log(productsDetails);
  };
  const modifyCancel = () => {
    setProductsDetatils({
      ...productsDetails,
      productName: "",
      productPrice: 0,
      categoryId: 0,
      productImg: "",
      colorId: 0,
    });
  };

  const modify = async () => {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.put(
      "http://localhost:8080/admin/products/modify",
      JSON.stringify(productsDetails),
      option
    );
    alert("수정되었습니다.");
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
        <ul css={productCardContainer}>
          {products.length > 0
            ? products.map((product) => (
                <>
                  <button css={deleteButton}>X</button>
                  <li css={productCard} onClick={() => productCartClick(product)}>
                    <ProductsCard product={product} key={product.productId} />
                  </li>
                </>
              ))
            : ""}
        </ul>
        <div css={modifyCardCotainer}>
          <div css={modifyCard}>
            <input
              css={productNameInput}
              value={productsDetails.productName}
              onChange={productNameInputHandle}
              type="text"
              placeholder="상품이름"
            />
            <input
              css={productPriceInput}
              value={productsDetails.productPrice}
              onChange={productPriceInputHandle}
              type="text"
              placeholder="상품가격(원)"
            />
            <select
              css={productCategoryInput}
              value={productsDetails.categoryId}
              onChange={productCategorySelectHandle}
              name="Category"
              id="categoryId"
            >
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
            <select
              css={productColorInput}
              value={productsDetails.colorId}
              onChange={productColorSelectHandle}
              name="Color"
              id="colorId"
            >
              {colors.map((color) => (
                <option key={color.id} value={color.colorId}>
                  {color.colorName}
                </option>
              ))}
            </select>
            {productsDetails.productImg != "" ? <img css={img} src={productsDetails.productImg} alt="" /> : <></>}

            <input
              css={productUrlInput}
              value={productsDetails.productImg}
              onChange={productImgUrlInputHandle}
              type="text"
              placeholder="이미지URL"
            />
            <div css={buttonList}>
              <button css={buttons} onClick={() => modify()}>
                수정
              </button>
              <button css={buttons}>삭제</button>
              <button css={buttons} onClick={() => modifyCancel()}>
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductModify;
