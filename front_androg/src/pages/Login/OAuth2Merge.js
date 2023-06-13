/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import CommonHeader from "../../components/commonHeader/CommonHeader";
import CommonFooter from "../../components/commonFooter/CommonFooter";
import LoginInput from "../../components/Login/LoginInput/LoginInput";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const header = css`
  padding-top: 20px;
  font-size: 40px;
  font-weight: 600;
`;

const main = css`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const footer = css`
  display: flex;
  flex-direction: column;
`;

const box = css`
  margin: 20px 0px 20px 0px;
`;

const agreeButton = css`
  width: 400px;
  height: 40px;
  margin-bottom: 100px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: black;
    text-decoration: underline;
    color: white;
  }
`;

const errorMsg = css`
  position: relative;
  font-size: 12px;
  color: red;
`;

const OAuth2Merge = () => {
  const providerMerge = useMutation(
    async (mergeData) => {
      try {
        const response = await axios.put(
          "https://port-0-androg-portfolio-app-back-7xwyjq992llitnrgqd.sel4.cloudtype.app/auth/oauth2/merge",
          mergeData
        );
        return response;
      } catch (error) {
        setErrorMsg(error.response.data.message);
        return error;
      }
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          window.location.replace("/auth/login");
        }
      },
    }
  );
  const [password, setPassword] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMsg] = useState("");

  const email = searchParams.get("email");
  const provider = searchParams.get("provider");

  const passwordChangeHandle = (e) => {
    setPassword(e.target.value);
  };

  const providerMergeSubmitHandle = () => {
    providerMerge.mutate({
      email,
      password,
      provider,
    });
  };
  return (
    <>
      <CommonHeader />
      <div css={container}>
        <header css={header}>
          <h1>계정통합</h1>
        </header>
        <main css={main}>
          <div css={box}>
            <h2>
              {email}계정을 {provider}와 통합하는 것에 동의하십니까?
            </h2>
          </div>
          <div css={box}>
            <LoginInput
              type="password"
              placeholder="기존 비밀번호를 입력하세요"
              onChange={passwordChangeHandle}
              name="password"
            />
            <div css={errorMsg}>{errorMessage}</div>
          </div>
        </main>
        <footer css={footer}>
          <button css={agreeButton} onClick={providerMergeSubmitHandle}>
            동의
          </button>
        </footer>
      </div>
      <CommonFooter />
    </>
  );
};

export default OAuth2Merge;
