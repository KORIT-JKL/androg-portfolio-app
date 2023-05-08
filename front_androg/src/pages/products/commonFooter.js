/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import { AiOutlineInstagram , AiOutlineFacebook } from 'react-icons/ai';
const footer =css`
    display: flex;
    flex-direction: column;
    width: 100%;
    
`
const footerTop = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #dbdbdb;
    height: 40px;
    width: 100%;
`
const footerTopLeft = css`

`
const footerTopRight = css`

`
const footerBottom =css`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #dbdbdb;
    height: 30px;
    width: 100%;
    font-size: 9px;
`
const icons = css`
    font-size: 30px;
    padding-left: 10px;
`
const androgText = css`
    font-size: 13px;
    padding-right: 10px;
`

const commonFooter = () => {
    return (
        <div css={footer}>
            <div css={footerTop}>
                    <div css={icons} >
                        <AiOutlineInstagram/>
                        <AiOutlineFacebook />
                    </div>
                    <div css={androgText}>
                        © 2023 Androg 
                    </div>
                   
            </div>
            <div css={footerBottom}>Androg 쇼핑물 | 대표 JKL | 사업자등록번호 123-45-6789 | 부산광역시 부산진구 에이원빌딜 | 통신판매신고번호 제 2023 - 부산진구 - 0001 호 [사업자정보확인] | 전화 000-0000-0000 | 이메일 JKL@naver.com | 개인정보관리책임자 KOREA TRIBE, INC. | 개인정보취급방침</div>
        </div>
    );
};

export default commonFooter;