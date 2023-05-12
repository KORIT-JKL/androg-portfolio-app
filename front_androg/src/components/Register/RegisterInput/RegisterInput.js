/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import Input from "../../Input/Input";

const registerInput = css`
    position: relative;
    margin-bottom: 40px;
    
`;

const RegisterInput = ({ type, placeholder, onChange, name}) => {
    return (
        <div css={registerInput}>
            <Input type={type} placeholder={placeholder} onChange={onChange} name={name}/>
        </div>
    );
};

export default RegisterInput;