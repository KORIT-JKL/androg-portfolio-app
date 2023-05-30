/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import impact from "../../../img/impact (1).png";
import { useNavigate } from "react-router-dom";
import CommonHeaderSubHeader from "../CommonAdminSubHeader.js/CommonAdminSubHeader";
import { AdminMenuSelect } from "../../../atoms/Admin/AdminAtoms";
import { useRecoilState } from "recoil";
const mainHeader = css`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #dbdbdb;
    background-color: white;
`;

const headerList = css`
    display: flex;
    align-items: center;
    width: 1400px;
    margin-left: 30px;
`;

const list = css`
    padding: 0px 10px;
    cursor: pointer;
    &:hover {
        font-weight: 600;
    }
`;

const img = css`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 60px;
    height: 40px;
    padding-left: 40px;
    &:hover {
        font-weight: 600;
    }
`;

const CommonAdminHeader = () => {
    const navigate = useNavigate();
    const [subHeaderIndex, SetSubHeaderIndex] = useState(0);
    const [AdminMenuSelectIndex, setThisAdminMenuSelect] = useRecoilState(AdminMenuSelect);
    const onClickLogo = () => {
        setThisAdminMenuSelect(1);
        navigate("/");
    };

    return (
        <>
            <div css={mainHeader}>
                <div css={img} onClick={() => onClickLogo()}>
                    HOME
                </div>

                <ul css={headerList}>
                    <li css={list} onMouseOver={() => SetSubHeaderIndex(0)}>
                        상품관리
                    </li>
                    <li css={list} onMouseOver={() => SetSubHeaderIndex(1)}>
                        리뷰관리
                    </li>
                    <li css={list} onMouseOver={() => SetSubHeaderIndex(2)}>
                        공지관리
                    </li>
                    <li css={list} onMouseOver={() => SetSubHeaderIndex(3)}>
                        문의관리
                    </li>
                    <li css={list} onMouseOver={() => SetSubHeaderIndex(4)}>
                        매출관리
                    </li>
                </ul>
            </div>
            <CommonHeaderSubHeader subHeaderIndex={subHeaderIndex} />
        </>
    );
};

export default CommonAdminHeader;
