/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from 'react';
import { useNavigate } from "react-router-dom";


const subHeader = css`
  background-color: white;
  display: flex;
  width: 100%;
  height: 50px;
`;
const subHeaderList = css`
  display: flex;
  margin-left: 100px;
  align-items: center;
`;
const sublist = css`
  padding-left: 10px;
  padding-right: 60px;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
const CommonHeaderSubHeader = ({subHeaderIndex} ) => {
    const navigate = useNavigate();
    
    return (
        
        <div css={subHeader}>
            <ul css={subHeaderList}>
                {subHeaderIndex == 0 ?
                <>
                <li css={sublist} onClick={() => navigate("/admin/product/addition")}>
                    상품 등록
                </li>
                <li css={sublist} onClick={() => navigate("/admin/product/modify")}>
                    상품 수정
                </li>
                <li css={sublist} onClick={() => navigate("/admin/product/soldout")}>
                    상품 품절
                </li>
            </>
            :
            subHeaderIndex == 1 ?
            <>
                    <li css={sublist} onClick={() => navigate("/admin/review/addition")}>
                        리뷰 등록
                    </li>
                    <li css={sublist} onClick={() => navigate("/admin/review/delete")}>
                        리뷰 삭제
                    </li>
                    <li css={sublist} onClick={() => navigate("/admin/review/review")}>
                        리뷰 댓글
                    </li>
                </>
            :
            subHeaderIndex == 2 ?
            <>
                    <li css={sublist} >
                        공지 등록
                    </li>
                    <li css={sublist} >
                        팝업 등록
                    </li>
                </> 
            :
            subHeaderIndex == 3 ?
            <>
                <li css={sublist} >
                    문의 접수
                </li>
                <li css={sublist} >
                    문의 답변
                </li>

            </>
            :
            ""
            }
                
            </ul>
        </div>
    );
};

export default CommonHeaderSubHeader;