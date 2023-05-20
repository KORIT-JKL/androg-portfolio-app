/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { setRefresh } from "../../../atoms/Common/CommonAtoms";
import { setPage, setProducts } from "../../../atoms/Product/ProductAtoms";
import ProductsCard from "../../../pages/products/productsCard";
import { useQuery } from "react-query";
import axios from "axios";
const categoryIdContainer = css`
  display: flex;
  width: 1500px;
  height: 100px;
  justify-cntent: center;
  text-align: center;

  margin: auto;
  padding: 20px;
`;
const categoryList = css`
  display: inline-block;
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
  const { categoryId } = useParams();
  const [refresh, setRefresh] = useState(true);
  const [products, setThisProducts] = useState([]);
  const [page, setThisPage] = useRecoilState(setPage);
  const [lastPage, setlastPage] = useState(1);
  const lastProductRef = useRef();

  useEffect(() => {
    const observerService = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setRefresh(true);
        }
      });
    };
    const observer = new IntersectionObserver(observerService, { threshold: 1 });
    observer.observe(lastProductRef.current);
  }, []);

  const option = {
    params: {
      page: page,
    },
  };
  const searchProducts = useQuery(
    ["searchProducts"],
    async () => {
      const response = await axios.get(`http://localhost:8080/products/category/${categoryId}`, option);

      return response;
    },
    {
      enabled: refresh && (option.params.page < lastPage + 1 || lastPage === 0),
      onSuccess: (response) => {
        const totalCount = response.data.productTotalCount;
        console.log(response);
        setThisProducts([...products, ...response.data.productList]);
        console.log(products);
        setlastPage(totalCount % 20 === 0 ? totalCount / 20 : Math.ceil(totalCount / 20));
        setThisPage(page + 1);
        setRefresh(false);
      },
    }
  );
  const navigate = useNavigate();
  const ProductsCardClick = (productId) => {};
  const setcategoryIdClick = (e) => {
    navigate(`/admin/product/modify/${e}`);
  };
  return (
    <div>
      <ul css={categoryIdContainer}>
        <li css={categoryList} value={1} onClick={() => setcategoryIdClick(1)}>
          TEES
        </li>
        <li css={categoryList} value={2} onClick={() => setcategoryIdClick(2)}>
          SWEATS
        </li>
        <li css={categoryList} value={3} onClick={() => setcategoryIdClick(3)}>
          PANTS
        </li>
        <li css={categoryList} value={4} onClick={() => setcategoryIdClick(4)}>
          OUTER
        </li>
        <li css={categoryList} value={5} onClick={() => setcategoryIdClick(5)}>
          HEADWEAR
        </li>
        <li css={categoryList} value={6} onClick={() => setcategoryIdClick(6)}>
          SHOES
        </li>
      </ul>
      <div css={container}>
        <ul css={productCardContainer}>
          {products.length > 0
            ? products.map((product) => (
                <>
                  <li css={productCard} onClick={() => ProductsCardClick(product.productId)}>
                    <ProductsCard product={product} key={product.productId} />
                  </li>
                </>
              ))
            : ""}
        </ul>
        <div ref={lastProductRef}></div>
      </div>
    </div>
  );
};

export default AdminProductModify;
