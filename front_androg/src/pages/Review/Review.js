/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import OrderProducts from "../../components/Products/OrderProducts";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const container = css`
  margin: 50px;
  width: 80%;
  height: 100%;
`;

const header = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  width: 50%;
  height: 100%;
`;

const Title = css`
  font-size: 30px;
  font-weight: 600;
  padding-bottom: 20px;
`;

const userInfo = css`
  padding: 0px 0px 20px 30px;
  font-size: 20px;
  font-weight: 600;
`;

const productBox = css`
  width: 80%;
`;

const textArea = css`
  margin: 10px;
  padding: 5px;
  width: 40%;
  height: 250px;
  resize: none;
  font-size: 20px;
`;

const footer = css`
  display: flex;
  justify-content: space-between;
  width: 40.8%;
`;

const reviewButton = css`
  margin: 0px 0px 10px 10px;
  padding: 5px;
  font-size: 12px;
  font-weight: bold;
  color: white;
  border-style: none;
  width: 200px;
  height: 40px;
  background-color: black;
  cursor: pointer;
  &:hover {
    background-color: grey;
    transition: 0.25s;
  }
`;

const Review = () => {
  const [userInfoRefresh, setUserInfoRefresh] = useState(true);
  const [content, setContent] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  let userId = 0;
  const principal = useQuery(
    ["principal"],
    async () => {
      const accessToken = localStorage.getItem("accessToken");
      //마이페이지 조회 url /user/{userId}/mypage -> /user/mypage로 변경
      const response = await axios.get("http://localhost:8080/user/mypage", {
        params: { accessToken },
      });
      return response;
    },
    {
      onSuccess: (response) => {
        userId = response.data.userId;
        setUserInfoRefresh(false);
      },
      enabled: userInfoRefresh,
    }
  );

  const getProduct = useQuery(
    ["getProduct"],
    async () => {
      const data = {
        params: {
          userId: principal.data.data.userId,
        },
      };
      const option = {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.get(
        `http://localhost:8080/product/${productId}/reviewproduct`,
        data,
        option
      );
      return response;
    },
    {
      onSuccess: (response) => {
        setUserInfoRefresh(true);
      },
      enabled: !!principal.data && userInfoRefresh,
    }
  );

  const reviewRegister = useMutation(
    async () => {
      const data = {
        userId: principal.data.data.userId,
        productId: parseInt(productId),
        content: content,
      };
      const option = {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      const response = await axios.post("http://localhost:8080/review/register", data, option);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log(response);
      },
    }
  );

  const onChangeHandle = (e) => {
    setContent(e.target.value);
  };

  if (principal.isLoading) {
    return <></>;
  }

  return (
    <div css={container}>
      <header css={header}>
        <h2 css={Title}>상품 후기 작성</h2>
        <div css={userInfo}>작성자</div>
        <div css={userInfo}>
          {principal.data !== undefined
            ? principal.data.data.name + "(" + principal.data.data.email + ")"
            : ""}
        </div>
      </header>
      <main>
        <div css={productBox}>
          <OrderProducts
            orderProduct={getProduct.data !== undefined ? getProduct.data.data : ""}
            isOpen={false}
          />
        </div>
        <textarea
          css={textArea}
          placeholder="내용을 입력하세요"
          onChange={onChangeHandle}
        ></textarea>
      </main>
      <footer css={footer}>
        <button
          css={reviewButton}
          onClick={() => {
            reviewRegister.mutate();
            navigate("/");
          }}
        >
          리뷰등록
        </button>
        <button css={reviewButton} onClick={() => navigate("/")}>
          리뷰취소
        </button>
      </footer>
    </div>
  );
};

export default Review;
