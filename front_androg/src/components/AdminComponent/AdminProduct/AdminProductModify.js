/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
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
  width: 1400px;
  margin-bottom: 100px;
  margin-top: 20px;
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
  height: 500px;
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
const optionList = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const optionTexst = css`
  display: flex;
  font-size: 16px;
  justify-content: center;
  width: 100%;
`;
const optionSelectContainer = css``;
const optionInput = css`
  margin: 10px 5px;
  width: 40px;
  height: 25px;
`;
const AdminProductModify = () => {
  const [selectCategoryId, setSelectCategoryId] = useState(1);
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
    sizeS: "",
    sizeM: "",
    sizeL: "",
    sizeXL: "",
    sizeXXL: "",
  });
  const productDelteFunction = useMutation(
    async () => {
      const option = {
        params: {
          productId: productsDetails.productId,
        },
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.delete("http://15.165.181.187/admin/products/delete", option);
      return response;
    },
    {
      onSuccess: () => {
        setRefresh(true);
      },
    }
  );
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
  const getColor = useQuery(
    ["getAllColor"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      // 전체 색상 들고오기
      const response = await axios.get("http://15.165.181.187/admin/products/colors", option);
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
      sizeS: product.sizeS,
      sizeM: product.sizeM,
      sizeL: product.sizeL,
      sizeXL: product.sizeXL,
      sizeXXL: product.sizeXXL,
    });
    setRefresh(true);
  };

  const setcategoryIdClick = (e) => {
    setSelectCategoryId(e);
    setRefresh(true);
  };

  const productInputHandle = (e) => {
    const { name, value } = e.target;
    setProductsDetatils({ ...productsDetails, [name]: value });
  };
  const productPriceInputHandle = (e) => {
    const { name, value } = e.target;
    setProductsDetatils({ ...productsDetails, [name]: value });
  };
  const modifyCancel = () => {
    setProductsDetatils({
      ...productsDetails,
      productId: 0,
      productName: "",
      productPrice: 0,
      categoryId: 0,
      productImg: "",
      colorId: 0,
      sizeS: "",
      sizeM: "",
      sizeL: "",
      sizeXL: "",
      sizeXXL: "",
    });
  };
  const productDelete = () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      productDelteFunction.mutate();
      setProductsDetatils({
        ...productsDetails,
        productId: 0,
        productName: "",
        productPrice: 0,
        categoryId: 0,
        productImg: "",
        colorId: 0,
        sizeS: "",
        sizeM: "",
        sizeL: "",
        sizeXL: "",
        sizeXXL: "",
      });
      alert("삭제 완료");
    } else {
      alert("삭제 취소");
    }
  };

  const modify = async () => {
    const option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    try {
      const response = await axios.put(
        "http://15.165.181.187/admin/products/modify",
        JSON.stringify(productsDetails),
        option
      );
      alert("수정되었습니다.");

      setRefresh(true);
      return response;
    } catch (error) {
      alert(error.response.data.message);
    }
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
              onChange={productInputHandle}
              type="text"
              placeholder="상품이름"
              name="productName"
            />
            <input
              css={productPriceInput}
              value={productsDetails.productPrice}
              onChange={productPriceInputHandle}
              type="number"
              placeholder="상품가격(원)"
              name="productPrice"
            />
            <select
              css={productCategoryInput}
              value={productsDetails.categoryId}
              onChange={productInputHandle}
              name="categoryId"
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
              onChange={productInputHandle}
              name="colorId"
              id="colorId"
            >
              {colors.map((color) => (
                <option key={color.id} value={color.colorId}>
                  {color.colorName}
                </option>
              ))}
            </select>
            {productsDetails.productImg !== "" ? <img css={img} src={productsDetails.productImg} alt="" /> : <></>}

            <input
              css={productUrlInput}
              value={productsDetails.productImg}
              onChange={productInputHandle}
              type="text"
              placeholder="이미지URL"
              name="productImg"
            />
            <div css={optionList}>
              <div css={optionTexst}>옵션1 옵션2 옵션3 옵션4 옵션5</div>
              <div css={optionSelectContainer}>
                <input
                  css={optionInput}
                  value={productsDetails.sizeS == null ? "" : productsDetails.sizeS}
                  onChange={productInputHandle}
                  name="sizeS"
                />
                <input
                  css={optionInput}
                  value={productsDetails.sizeM == null ? "" : productsDetails.sizeM}
                  onChange={productInputHandle}
                  name="sizeM"
                />
                <input
                  css={optionInput}
                  value={productsDetails.sizeL == null ? "" : productsDetails.sizeL}
                  onChange={productInputHandle}
                  name="sizeL"
                />
                <input
                  css={optionInput}
                  value={productsDetails.sizeXL == null ? "" : productsDetails.sizeXL}
                  onChange={productInputHandle}
                  name="sizeXL"
                />
                <input
                  css={optionInput}
                  value={productsDetails.sizeXXL == null ? "" : productsDetails.sizeXXL}
                  onChange={productInputHandle}
                  name="sizeXXL"
                />
              </div>
            </div>
            <div css={buttonList}>
              {productsDetails.productId > 0 ? (
                <>
                  <button css={buttons} onClick={() => modify()}>
                    수정
                  </button>
                  <button css={buttons} onClick={() => productDelete()}>
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <button css={buttons} onClick={() => alert("상품을 선택해주세요")}>
                    수정
                  </button>
                  <button css={buttons} onClick={() => alert("상품을 선택해주세요")}>
                    삭제
                  </button>
                </>
              )}

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
