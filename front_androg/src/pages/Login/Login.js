/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import LoginInput from "../../components/Login/LoginInput/LoginInput";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loginState, refreshState } from "../../atoms/Auth/AuthAtoms";

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
  margin-top: 50px;
`;

const loginButton = css`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
  cursor: pointer;
`;
const inputCss = css`
  position: relative;
`;

const errorMsg = css`
  position: absolute;
  top: 40px;
  font-size: 12px;
  color: red;
`;

const passwordFindButton = css`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

const registerButton = css`
  width: 400px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
`;

const footer = css`
  display: flex;
  flex-direction: column;
`;

const Login = () => {
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const [errorMessages, setErrorMessages] = useState({ email: "", password: "" });
  const [refresh, SetRefresh] = useRecoilState(refreshState);
  const [loginIsState, setLoginIsState] = useRecoilState(loginState);

  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };

  const loginSubmitHandle = async () => {
    const option = {
      headers: {
        "Content-Type": "application/json"
      },
    };
    try {
      const response = await axios.post("http://localhost:8080/auth/login", JSON.stringify(loginUser), option);
      setErrorMessages({ email: "", password: "" });

      const accessToken = response.data.grantType + " " + response.data.accessToken;
      localStorage.setItem("accessToken", accessToken);
      SetRefresh(false);
      setLoginIsState(true);
      navigate("/");
    } catch (error) {
      setErrorMessages({ email: "", password: "", ...error.response.data.errorData });
    }
  };



    const onKeyPress = (e) => {
        if(e.key==='Enter') {
            loginSubmitHandle();
        }
    }

    return (
        <>
            <CommonHeader />
            <div css={container}>
                <header css={header}>
                    <h1>Login</h1>
                </header>
                <main css={main}>
                    <div css={inputCss}>
                        <LoginInput type="email" placeholder="Email" onChange={onChangeHandle} name="email">
                        <AiOutlineMail />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessages.email}</div>
                    </div>

                    <div css={inputCss}>
                        <LoginInput type="password" placeholder="Password" onChange={onChangeHandle} name="password">
                        <RiLockPasswordLine />
                        </LoginInput>
                        <div css={errorMsg}>{errorMessages.password}</div>
                    </div>
                </main>
               
              

                <footer css={footer}>
                    <button css={loginButton} onClick={loginSubmitHandle} onKeyUp={onKeyPress}>로그인</button>
                    <button css={passwordFindButton}>비밀번호 찾기</button>
                    <button css={registerButton}><Link to="/register">회원가입</Link></button>
                </footer>

            </div>
            <CommonFooter />
        </>
    );
};

export default Login;
