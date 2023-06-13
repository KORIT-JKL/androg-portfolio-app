/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import RegisterInput from "../../components/Register/RegisterInput/RegisterInput";
import axios from "axios";
import { useMutation } from "react-query";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/Error/ErrorMessage";
const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 865px;
`;

const header = css`
  margin-top: 150px;
  font-size: 30px;
  font-weight: 300;
`;

const main = css`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const mainTxt = css`
  font-size: 12px;
  margin-bottom: 23px;
`;

const inputCss = css`
  position: relative;
`;

const privacy = css`
  display: flex;
`;

const privacyBtn = css`
  margin-right: 15px;
`;
const text = css`
  font-size: 10px;
  margin-top: 4px;
`;

const footer = css`
  display: flex;
`;

const registerButton = css`
  width: 400px;
  height: 40px;
  margin-top: 40px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
`;
const OAuth2Register = () => {
  const [password, setPassword] = useState({ password: "" });
  const [errorMessages, setErrorMessages] = useState({ password: "" });
  const oAuth2Register = useMutation(
    async (registerData) => {
      const option = {
        headers: {
          "Content-Type": "application/json",
          registerToken: `Bearer ${registerToken}`,
        },
      };
      try {
        const response = await axios.post(
          "https://port-0-androg-portfolio-app-back-7xwyjq992llitnrgqd.sel4.cloudtype.app/auth/oauth2/register",
          registerData,
          option
        );
        setErrorMessages({ password: "" });
        return response;
      } catch (error) {
        setErrorMessages({ password: "", ...error.response.data.errorData });
        return error;
      }
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert("회원가입 완료");
          window.location.replace("/auth/login");
        }
      },
    }
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const registerToken = searchParams.get("registerToken");
  const email = searchParams.get("email");
  const name = searchParams.get("name");
  const provider = searchParams.get("provider");

  const passwordOnchange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const registerSubmitHandle = () => {
    oAuth2Register.mutate({
      email,
      name,
      provider,
      ...password,
    });
  };

  return (
    <>
      <CommonHeader />
      <div css={container}>
        <header css={header}>
          <h1>회원가입</h1>
        </header>
        <main css={main}>
          <p css={mainTxt}>
            회원으로 가입하시면 Androg 에서 운영하는 온라인 스토어의 서비스를 아이
            <br />
            디로 이용하실 수 있습니다.
          </p>
          <div css={inputCss}>
            <RegisterInput type="email" placeholder="이메일" name="email" disabled={true} value={email} />
          </div>
          <div css={inputCss}>
            <RegisterInput type="password" placeholder="비밀번호" onChange={passwordOnchange} name="password" />
          </div>
          <ErrorMessage children={errorMessages.password} />
          <div css={inputCss}>
            <RegisterInput type="name" placeholder="이름" name="name" disabled={true} value={name} />
          </div>
          <div css={privacy}>
            <input type="checkbox" css={privacyBtn} />
            <label css={text}>
              <a href="/page/legal">개인정보 보호정책</a> 및 <a href="/page/legal">이용약관</a> 동의
            </label>
          </div>
        </main>
        <footer css={footer}>
          <button css={registerButton} onClick={registerSubmitHandle}>
            회원가입
          </button>
        </footer>
      </div>
      <CommonFooter />
    </>
  );
};

export default OAuth2Register;
