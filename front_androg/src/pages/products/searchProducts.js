/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import axios from "axios";
import ProductsCard from "./productsCard";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import QueryString from "qs";
import { setRefresh } from "../../atoms/Common/CommonAtoms";
import { setProducts, setSearchParams } from "../../atoms/Product/ProductAtoms";

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
  width: 1200px;
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

const SearchProducts = () => {
  const [refresh, setThiRefresh] = useRecoilState(setRefresh);
  const [products, setThisProducts] = useRecoilState(setProducts);
  const [searchParams, setThisSearchParams] = useRecoilState(setSearchParams);
  const [lastPage, setlastPage] = useState(1);
  const lastProductRef = useRef();

  useEffect(() => {
    if (!searchProducts.isLoading) {
      const observerService = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setThiRefresh(true);
          }
        });
      };
      const observer = new IntersectionObserver(observerService, { threshold: 1 });
      observer.observe(lastProductRef.current);
    }
  }, [refresh]);

  const option = {
    params: {
      searchParams: searchParams,
    },
    paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: "repeat" }),
  };

  const searchProducts = useQuery(
    ["searchProducts"],
    async () => {
      const response = await axios.get("http://15.165.181.187/products/search", option);
      return response;
    },
    {
      onSuccess: (response) => {
        const totalCount = response.data.productTotalCount;
        setlastPage(totalCount % 20 === 0 ? totalCount / 20 : Math.ceil(totalCount / 20));
        setThisProducts([...products, ...response.data.productList]);
        setThisSearchParams({
          setSearchPage: searchParams.setSearchPage + 1,
          setSearchInput: searchParams.setSearchInput,
        });
        setThiRefresh(false);
      },
      enabled: refresh && (searchParams.setSearchPage < lastPage + 1 || lastPage === 0),
    }
  );

  const navigate = useNavigate();
  const ProductsCardClick = (productId) => {
    navigate(`/auth/products/${productId}/details`);
  };

  if (searchProducts.isLoading) {
    return <></>;
  }

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

export default SearchProducts;
