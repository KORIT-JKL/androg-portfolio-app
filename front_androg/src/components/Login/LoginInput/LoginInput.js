/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import Input from '../../Input/Input';

const icon = css`
    position: absolute;
    top: 12px;
    transform: translateX(-100%);
`;

const loginInput = css`
    position: relative;
    margin-bottom: 20px;
`;

const LoginInput = ({ type, placeholder, onChange, name, children }) => {
    return (
        <div css={loginInput}>
           <div css={icon}>{children}</div> 
          <Input type={type} placeholder={placeholder} onChange={onChange} name={name}/>  
        </div>
    );
};

export default LoginInput;