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
    transition: 0.4s;
    &:hover {
        background-color: #848484;
    }
    &:active {
        background-color: #fafafa;
    }
`;
const soldoutcontainer = css`
    padding: 0px;
    position: absolute;
    z-index: 10;
    display: flex;
    width: 290px;
    height: 420px;
    background-color: #00000099;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
`;
const soldoutText = css`
    color: red;
    font-size: 140px;
`;
const selectContainer = css`
    display: flex;
    width: 100%;
    height: 40px;
    justify-content: flex-start;
    margin: 15px 0px;
    padding-left: 110px;
`;

const selectBox = css`
    border-radius: 10px;
    height: 100%;
    width: 200px;
`;
const Products = () => {
    const { categoryId } = useParams();
    const [refresh, setThiRefresh] = useRecoilState(setRefresh);
    const [products, setThisProducts] = useRecoilState(setProducts);
    const [page, setThisPage] = useRecoilState(setPage);
    const [lastPage, setlastPage] = useState(1);
    const [selectNum, setSelectNum] = useState(1);
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
            select: selectNum,
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
        navigate(`/auth/products/${productId}/details`);
    };
    const setSelectNumHandle = (e) => {
        setSelectNum(e);
        setThisPage(1);
        setThisProducts([]);
        setThiRefresh(true);
    };
    return (
        <div>
            <CommonHeader />
            <div css={container}>
                <div css={selectContainer}>
                    <select css={selectBox} defaultValue={1} onChange={(e) => setSelectNumHandle(e.target.value)}>
                        <option value="1">가격이 높은 순</option>
                        <option value="2">가격이 낮은 순</option>
                        <option value="3">색상별</option>
                    </select>
                </div>
                <ul css={productCardContainer}>
                    {products.length > 0
                        ? products.map((product) => (
                              <>
                                  {product.soldoutFlag === 0 ? (
                                      <>
                                          <li css={productCard} key={product.productId}>
                                              <div css={soldoutcontainer}>
                                                  <div css={soldoutText}>품절</div>
                                              </div>
                                              <ProductsCard product={product} key={product.productId} />
                                          </li>
                                      </>
                                  ) : (
                                      <>
                                          <li
                                              key={product.productId}
                                              css={productCard}
                                              onClick={() => ProductsCardClick(product.productId)}
                                          >
                                              <ProductsCard product={product} key={product.productId} />
                                          </li>
                                      </>
                                  )}
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
