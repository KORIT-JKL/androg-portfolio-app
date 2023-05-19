/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import CommonAdminHeader from "../../components/CommonHeader/CommonAdminHeader/CommonAdminHeader";

const AdminPage = () => {
  return (
    <div>
      <CommonAdminHeader />

      <CommonFooter />
    </div>
  );
};

export default AdminPage;
