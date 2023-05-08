/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from 'react';
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from '../../components/CommonFooter/CommonFooter';
import LoginInput from "../../components/Login/LoginInput/LoginInput";
import { AiOutlineMail } from "react-icons/ai"; 
import { RiLockPasswordLine } from 'react-icons/ri';

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
    background-color: white;
    border: 1px solid black;
`;


const footer = css`
    display: flex;
    flex-direction: column;
    
`;
const Login = () => {
    const [loginUser , setLoginUser] = useState({email:"", password:""});

    const onChangeHandle = (e) => {
        const { name , value } = e.target;
        setLoginUser({...loginUser, [name]: value}); 
    }

    return (
        <>
            <CommonHeader />
            <div css={container}>
                <header css={header}>
                    <h1>Login</h1>
                </header>
                <main css={main}>
                    <LoginInput type="email" placeholder="Email" onChange={onChangeHandle} name="email">
                    <AiOutlineMail />
                    </LoginInput>

                    <LoginInput type="password" placeholder="Password" onChange={onChangeHandle} name="email">
                    <RiLockPasswordLine />
                    </LoginInput>
                </main>
               
              

                <footer css={footer}>

                    <button css={loginButton}>로그인</button>
                    <button css={loginButton}>비밀번호 찾기</button>
                    <button css={loginButton}>회원가입</button>
                </footer>

            </div>
            <CommonFooter />
        </>
    );
};

export default Login;