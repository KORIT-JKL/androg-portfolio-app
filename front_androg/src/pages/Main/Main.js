/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import CommonFooter from '../../components/CommonFooter/CommonFooter';
import  mainPageImg  from '../../img/Black And White Minimalist Aesthetic Modern Simple Neon Typography Fog Store Logo.png';


const mainPage = css`
    display: flex;
    justify-content: center;
    
`;

const img = css`
    width: 800px;
    margin-top: 110px;
    margin-bottom: 10px;
`;

const Main = () => {
    return (
        <>
            <CommonHeader />
                <div css={mainPage}>
                    <img src={mainPageImg} css={img}/>
                </div>
            <CommonFooter />
        </>
    );
};

export default Main;