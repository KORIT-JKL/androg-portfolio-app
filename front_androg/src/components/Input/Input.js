/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';

const input = css`
   height: 40px;
   width: 400px;
   border: none;
   border-bottom: 1px solid black;
   outline: none;
   font-size: 15px;
   text-align: left;
`;

const Input = ({ type, placeholder, onChange, name}) => {

    return (
        <>
           <input css={input}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            />   
        </>
    );
};

export default Input;