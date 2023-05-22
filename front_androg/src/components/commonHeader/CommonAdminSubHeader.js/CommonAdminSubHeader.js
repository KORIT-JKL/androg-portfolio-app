/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AdminMenuSelect } from "../../../atoms/Admin/AdminAtoms";

const subHeader = css`
  background-color: white;
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #dbdbdb;
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
const CommonHeaderSubHeader = ({ subHeaderIndex }) => {
  const [AdminMenuSelectIndex, setThisAdminMenuSelect] = useRecoilState(AdminMenuSelect);
  const navigate = useNavigate();
  const clickProductRegister = () => {
    setThisAdminMenuSelect(1);
    navigate("/admin/product/register");
  };
  const clickProductModify = () => {
    setThisAdminMenuSelect(2);
    navigate("/admin/product/modify/1");
  };
  const clickProductSoldout = () => {
    setThisAdminMenuSelect(3);
    navigate("/admin/product/soldout");
  };
  const clickReviewRegister = () => {
    setThisAdminMenuSelect(4);
    navigate("/admin/review/register");
  };
  const clickReviewDelete = () => {
    setThisAdminMenuSelect(5);
    navigate("/admin/review/delete");
  };
  const clickReviewReview = () => {
    setThisAdminMenuSelect(6);
    navigate("/admin/review/review");
  };
  const clickNoticeRegister = () => {
    setThisAdminMenuSelect(7);
    navigate("/admin/notice/register");
  };
  const clickpopUpRegister = () => {
    setThisAdminMenuSelect(8);
    navigate("/admin/popUp/register");
  };
  const clickInquiry = () => {
    setThisAdminMenuSelect(9);
    navigate("/admin/inquiry");
  };
  const clickInquiryReview = () => {
    setThisAdminMenuSelect(10);
    navigate("/admin/inquiry/review");
  };

  return (
    <div css={subHeader}>
      <ul css={subHeaderList}>
        {subHeaderIndex === 0 ? (
          <>
            <li css={sublist} onClick={() => clickProductRegister()}>
              상품 등록
            </li>
            <li css={sublist} onClick={() => clickProductModify()}>
              상품 수정
            </li>
            <li css={sublist} onClick={() => clickProductSoldout()}>
              상품 품절
            </li>
          </>
        ) : subHeaderIndex === 1 ? (
          <>
            <li css={sublist} onClick={() => clickReviewDelete()}>
              리뷰 삭제
            </li>
            <li css={sublist} onClick={() => clickReviewReview()}>
              리뷰 댓글
            </li>
          </>
        ) : subHeaderIndex == 2 ? (
          <>
            <li css={sublist} onClick={() => clickNoticeRegister()}>
              공지 등록
            </li>
            <li css={sublist} onClick={() => clickpopUpRegister()}>
              팝업 등록
            </li>
          </>
        ) : subHeaderIndex == 3 ? (
          <>
            <li css={sublist} onClick={() => clickInquiry()}>
              문의 접수
            </li>
            <li css={sublist} onClick={() => clickInquiryReview()}>
              문의 답변
            </li>
          </>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default CommonHeaderSubHeader;
