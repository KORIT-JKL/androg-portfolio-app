/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import Input from "./../../components/Input/Input";
import RegisterInput from "../../components/Register/RegisterInput/RegisterInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const errorMsg = css`
  position: absolute;
  top: 40px;
  color: red;
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

const Register = () => {
  const [registerUser, setRegisterUser] = useState({ email: "", passowrd: "", name: "" });
  const [errorMessages, setErrorMessages] = useState({ email: "", password: "", name: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const registerSubmitHandle = async () => {
    const data = {
      ...registerUser,
    };
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("http://localhost:8080/auth/signup", JSON.stringify(data), option);

      setErrorMessages({ email: "", password: "", name: "" });
      navigate("/auth/login");
    } catch (error) {
      setErrorMessages({ email: "", password: "", name: "", ...error.response.data.errorData });
    }
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
            <RegisterInput type="email" placeholder="이메일" onChange={onChange} name="email" />
            <div css={errorMsg}>{errorMessages.email}</div>
          </div>
          <div css={inputCss}>
            <RegisterInput type="password" placeholder="비밀번호" onChange={onChange} name="password" />
            <div css={errorMsg}>{errorMessages.password}</div>
          </div>
          <div css={inputCss}>
            <RegisterInput type="name" placeholder="이름" onChange={onChange} name="name" />
            <div css={errorMsg}>{errorMessages.name}</div>
          </div>
          <div css={privacy}>
            <input type="checkbox" css={privacyBtn} />
            <label css={text}>
              <a href="">개인정보 보호정책</a> 및 <a href="">이용약관</a> 동의
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

export default Register;
