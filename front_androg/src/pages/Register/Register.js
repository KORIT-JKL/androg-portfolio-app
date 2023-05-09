/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import CommonFooter from '../../components/CommonFooter/CommonFooter';
import Input from './../../components/Input/Input';
import RegisterInput from "../../components/Register/RegisterInput/RegisterInput";

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

const privacy = css`
    display: flex;
`;

const privacyBtn = css`
    margin-right: 20px;

`;
const text = css`
    font-size: 10px;
    margin-top: 5px;
`;

const footer = css`

`;

const Register = () => {
    const onChange = () => {
        
    };
    return (
        <>
            <CommonHeader />
            <div css={container}>
                <header css={header}>
                    <h1>Register</h1>
                </header>
                <main css={main}>
                    <RegisterInput type="username" placeholder="이름" onChange={onChange} name="username" />
                    <RegisterInput type="email" placeholder="이메일" onChange={onChange} name="email" />
                    <RegisterInput type="password" placeholder="비밀번호" onChange={onChange} name="password" />
                    <div css={privacy}>
                        <input type="checkbox" css={privacyBtn}/>
                        <label css={text}>개인정보 보호정책 및 이용약관 동의</label>
                    </div>
                </main>
                <footer css={footer}>

                </footer>
            </div>
            <CommonFooter />
        </>
    );
};

export default Register;