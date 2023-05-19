/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import { useNavigate, useParams } from "react-router-dom";
import ProductsCard from "./productsCard";
import { useRecoilState } from "recoil";
import { setRefresh } from "../../atoms/Common/CommonAtoms";
import { setPage, setProducts } from "../../atoms/Product/ProductAtoms";

const container = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding-top: 100px;
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

const Products = () => {
  const { categoryId } = useParams();
  const [refresh, setThiRefresh] = useRecoilState(setRefresh);
  const [products, setThisProducts] = useRecoilState(setProducts);
  const [page, setThisPage] = useRecoilState(setPage);
  const [lastPage, setlastPage] = useState(1);
  const lastProductRef = useRef();

  useEffect(() => {
    const observerService = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setThiRefresh(true);
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
      const response = await axios.get(`http://localhost:8080/category/${categoryId}`, option);

      return response;
    },
    {
      enabled: refresh && (option.params.page < lastPage + 1 || lastPage === 0),
      onSuccess: (response) => {
        // 여기 어딘가 아주 문제 product리스트가 초기화도 안되고 추가만 됨
        setThiRefresh(false);
        const totalCount = response.data.productTotalCount;
        setThisProducts([...products, ...response.data.productList]);
        setlastPage(totalCount % 20 === 0 ? totalCount / 20 : Math.ceil(totalCount / 20));
        setThisPage(page + 1);
      },
    }
  );
  const navigate = useNavigate();
  const ProductsCardClick = (productId) => {
    navigate(`/products/${productId}/details`);
  };

  return (
    <div>
      <CommonHeader />
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
      <CommonFooter />
    </div>
  );
};

export default Products;
