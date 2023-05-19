/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import CommonAdminHeader from "../../components/CommonHeader/CommonAdminHeader/CommonAdminHeader";
import { useRecoilState } from "recoil";
import { AdminMenuSelect } from "../../atoms/Admin/AdminAtoms";
import AdminProductRegister from "../../components/AdminComponent/AdminProduct/AdminProductRegister";
import AdminProductModify from "../../components/AdminComponent/AdminProduct/AdminProductModify";
import AdminProductSoldOut from "../../components/AdminComponent/AdminProduct/AdminProductSoldOut";
import AdminReviewDelete from "../../components/AdminComponent/AdminReview/AdminReviewDelete";
import AdminReviewReview from "../../components/AdminComponent/AdminReview/AdminReviewReview";
import AdminReviewRegister from "../../components/AdminComponent/AdminReview/AdminReviewRegister";
import AdminPopUpRegister from "../../components/AdminComponent/AdmingNoticeAndPopUp/AdminPopUpRegister";
import AdminInquiryReview from "../../components/AdminComponent/AdminInquiry/AdminInquiryReview";
import AdminInquiry from "../../components/AdminComponent/AdminInquiry/AdminInquiry";
import AdminNoticeRegitser from "../../components/AdminComponent/AdmingNoticeAndPopUp/AdminNoticeRegitser";

const AdmingPage = css`
  display: flex;
  justify-content: center;
`;
const AdminPage = () => {
  const [AdminMenuSelectIndex, setThisAdminMenuSelect] = useRecoilState(AdminMenuSelect);
  return (
    <>
      <CommonAdminHeader />
      <div css={AdmingPage}>
        {AdminMenuSelectIndex === 0 ? (
          ""
        ) : AdminMenuSelectIndex === 1 ? (
          <AdminProductRegister />
        ) : AdminMenuSelectIndex === 2 ? (
          <AdminProductModify />
        ) : AdminMenuSelectIndex === 3 ? (
          <AdminProductSoldOut />
        ) : AdminMenuSelectIndex === 4 ? (
          <AdminReviewRegister />
        ) : AdminMenuSelectIndex === 5 ? (
          <AdminReviewDelete />
        ) : AdminMenuSelectIndex === 6 ? (
          <AdminReviewReview />
        ) : AdminMenuSelectIndex === 7 ? (
          <AdminNoticeRegitser />
        ) : AdminMenuSelectIndex === 8 ? (
          <AdminPopUpRegister />
        ) : AdminMenuSelectIndex === 9 ? (
          <AdminInquiry />
        ) : AdminMenuSelectIndex === 10 ? (
          <AdminInquiryReview />
        ) : (
          ""
        )}
      </div>
      <CommonFooter />
    </>
  );
};

export default AdminPage;
