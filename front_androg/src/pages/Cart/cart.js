/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";
import { setRefresh } from "../../atoms/Common/CommonAtoms";
import { cartIsOpenState } from "../../atoms/Cart/CartAtoms";
import { authenticationState } from "../../atoms/Auth/AuthAtoms";
const cartContainer = css`
    position: fixed;
    z-index: 999;
    background-color: #00000099;
    width: 100%;
    height: 100%;
    padding-top: 100px;
`;
const mainCartContainer = css`
    display: flex;
    flex-direction: column;
    float: right;
    height: 100%;
    width: 50%;
    background-color: white;
`;
const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    border-bottom: 1px solid #dbdbdb;
    margin-top: 20px;
`;
const cartText = css`
    display: flex;
    align-items: center;
    margin: 20px;
    font-size: 20px;
    height: 50px;
    font-weight: 600;
    text-decoration: underline;
`;
const closeButton = css`
    margin: 10px;
    width: 40px;
    font-size: 30px;
    background-color: white;
    border: 0px;
    cursor: pointer;
`;
const main = css`
    display: flex;
    flex-direction: column;
    height: 85%;
    border-bottom: 1px solid #dbdbdb;
    overflow-y: auto;
`;
const mainProduct = css`
    display: flex;
    height: 200px;
    margin: 10px 0px;
`;
const imgContainer = css`
    height: 200px;
    width: 30%;
`;
const img = css`
    margin: 20px;
    height: 100%;
    width: 100%;
`;
const detailContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    padding: 20px;
    padding-left: 40px;
`;
const productName = css`
    display: flex;
    justify-content: space-between;
    height: 10%;
    margin: 10px 5px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dbdbdb;
`;
const productDelectButton = css`
    background-color: white;
    height: 20px;
    width: 25px;
    border: none;
    margin-right: 20px;
    cursor: pointer;
    &:hover {
        background-color: #dbdbdb;
    }
    &:active {
        background-color: #fafafa;
    }
`;
const productOption = css`
    height: 15%;
    margin: 10px 5px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dbdbdb;
`;
const productPrice = css`
    height: 25px;
    margin: 10px 5px;
    padding-bottom: 30px;
    border-bottom: 1px solid #dbdbdb;
`;
const productCount = css`
    height: 45%;
    margin: 10px 5px;
    display: flex;
    align-items: center;
`;
const plusAndMinus = css`
    font-size: 20px;
    background-color: white;
    margin: 0px 5px;
    border: 1px solid #dbdbdb;
    cursor: pointer;
`;
const CountButton = css`
    font-size: 20px;
    background-color: white;
    margin: 0px 5px;
    border: 1px solid black;
`;
const space = css`
    height: 100px;
`;
const deliveryText = css`
    padding: 10px;
    display: flex;
    margin-left: 20px;
`;
const checkLists = css`
    display: flex;
    flex-direction: column;
    padding: 30px;
`;

const checkList = css`
    display: flex;
    padding: 10px 0px;
`;
const checkBox = css`
    cursor: pointer;
`;
const totalPriceContainer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width: 100%;
    margin-left: 20px;
    padding-right: 50px;
`;
const totalPriceText = css`
    font-size: 15px;
`;
const footer = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
`;
const shoppingButton = css`
    height: 80px;
    width: 350px;
    margin: 10px;
    background-color: white;
    font-weight: 600;
    font-size: 17px;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
        background-color: grey;
        color: white;
    }
`;
const payButton = css`
    height: 80px;
    width: 350px;
    margin: 10px;
    font-size: 17px;
    font-weight: 600;
    transition: 0.4s;
    cursor: pointer;
    transition: 0.4s;
    &:hover {
        background-color: grey;
        color: white;
    }
`;
const Cart = () => {
    // eslint-disable-next-line no-unused-vars
    const [count, setCount] = useState(0);
    const [refresh, setThiRefresh] = useRecoilState(setRefresh);
    const [userId, setUserId] = useState(0);
    const [, setCartIsOpen] = useRecoilState(cartIsOpenState);
    const [getproducts, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [deleteSuccess, setDeleteSuccess] = useState(true);
    const [chekcked1, setChecked1] = useState(false);
    const [chekcked2, setChecked2] = useState(false);

    const navigate = useNavigate();
    const cartClose = () => {
        setCartIsOpen(false);
    };
    const countplus = useMutation(
        async (product) => {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.put("http://localhost:8080/cart/update/countUp", product, option);
            return response;
        },
        {
            onSuccess: () => {
                setDeleteSuccess(true);
            },
        }
    );
    const countMinus = useMutation(
        async (product) => {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.put("http://localhost:8080/cart/update/countDown", product, option);
            return response;
        },
        {
            onSuccess: () => {
                setDeleteSuccess(true);
            },
        }
    );

    const deleteProduct = useMutation(
        async (product) => {
            const option = {
                params: {
                    cartId: product.cartId,
                },
                headers: { Authorization: `${localStorage.getItem("accessToken")}` },
                paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: "repeat" }),
            };
            const response = await axios.delete("http://localhost:8080/cart/delete", option);
            return response;
        },
        {
            onSuccess: () => {
                setDeleteSuccess(true);
            },
        }
    );

    useEffect(() => {
        document.body.style = `overflow: hidden`;
        return () => (document.body.style = `overflow: auto`);
    }, [userId]);

    const principal = useQuery(
        ["principal"],
        async () => {
            const option = {
                headers: {
                    Authorization: `${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.get("http://localhost:8080/auth/principal", option);

            return response;
        },
        {
            onSuccess: (response) => {
                setUserId(response.data.userId);
                setThiRefresh(false);
            },
            enabled: refresh,
        }
    );

    const getCart = useQuery(
        ["getCart"],
        async () => {
            // const accessToken = localStorage.getItem("accessToken");
            const option = {
                params: { userId: userId },
                headers: {
                    Authorization: `${localStorage.getItem("accessToken")}`,
                },
            };
            const response = await axios.get("http://localhost:8080/cart", option);
            return response;
        },
        {
            enabled: userId !== 0 && deleteSuccess,
            onSuccess: (response) => {
                if (response == null) {
                    setThiRefresh(true);
                }
                setProducts(response.data); // Update the state with response.data
                let totalPrice = 0;
                response.data.forEach((product) => {
                    totalPrice += product.productPrice * product.countNumber;
                });
                setTotalPrice(totalPrice);
                setThiRefresh(false);
                setDeleteSuccess(false);
            },
        }
    );

    const payment = () => {
        if (chekcked1 && chekcked2) {
            navigate(`/product/payment`);
            setThiRefresh(true);
        } else {
            alert("이용 약관 동의를 체크해주세요");
            setThiRefresh(true);
        }
    };
    if (principal.isLoading && getCart.isLoading) {
        return <></>;
    }
    return (
        <div css={cartContainer}>
            <div css={mainCartContainer}>
                <div css={header}>
                    <div css={cartText}>장바구니</div>
                    <button css={closeButton} onClick={() => cartClose()}>
                        X
                    </button>
                </div>
                <div css={main}>
                    {getproducts != null
                        ? getproducts.map((product) => (
                              <>
                                  <div css={mainProduct} key={product.cartId}>
                                      <div css={imgContainer}>
                                          <img css={img} src={product.productImg} alt="" />
                                      </div>
                                      <div css={detailContainer}>
                                          <div css={productName}>
                                              {product.productName}
                                              <button
                                                  css={productDelectButton}
                                                  onClick={() => deleteProduct.mutate(product)}
                                              >
                                                  X
                                              </button>
                                          </div>
                                          <div css={productOption}>
                                              {product.colorName} / {product.sizeName}
                                          </div>
                                          <div css={productPrice}>
                                              ₩{product.productPrice * product.countNumber} (Count :{" "}
                                              {product.countNumber})
                                          </div>
                                          <div css={productCount}>
                                              <button css={plusAndMinus} onClick={() => countMinus.mutate(product)}>
                                                  -
                                              </button>
                                              <button css={CountButton}>{product.countNumber}</button>
                                              <button css={plusAndMinus} onClick={() => countplus.mutate(product)}>
                                                  +
                                              </button>
                                          </div>
                                      </div>
                                  </div>
                              </>
                          ))
                        : null}

                    {/* 여기까지가 살 물품들 */}
                    <div css={space}></div>

                    <div css={deliveryText}>배송비는 다음 단계에서 적용됩니다.</div>
                    <div css={deliveryText}>10만원 이상 구매 시 무료배송 / 제외가 적용 됩니다.</div>
                    <div css={checkLists}>
                        <div css={checkList}>
                            <input
                                id="check1"
                                type="checkbox"
                                css={checkBox}
                                chekced={chekcked1}
                                onChange={() => setChecked1(!chekcked1)}
                            ></input>
                            <div>개인정보 수집 및 이용 동의</div>
                        </div>
                        <div css={checkList}>
                            <input
                                id="check2"
                                type="checkbox"
                                css={checkBox}
                                chekced={chekcked2}
                                onChange={() => setChecked2(!chekcked2)}
                            ></input>
                            <div>이용약관 동의</div>
                        </div>
                    </div>
                    <div css={totalPriceContainer}>
                        <div css={totalPriceText}>총 가격</div>
                        <div>₩ {totalPrice}</div>
                    </div>
                </div>
                <div css={footer}>
                    <button onClick={() => cartClose()} css={shoppingButton}>
                        쇼핑 계속하기
                    </button>
                    <button onClick={() => payment()} css={payButton}>
                        결제하기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
