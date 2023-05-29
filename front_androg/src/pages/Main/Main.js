/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import mainPageImg from "../../img/ANDROG 1.png";

const mainPage = css`
  display: flex;
  justify-content: center;
`;

const img = css`
  width: 800px;
  margin-top: 230px;

  margin-bottom: 230px;
`;

const Main = () => {
  return (
    <>
      <CommonHeader />
      <div css={mainPage}>
        <img src={mainPageImg} css={img} />
      </div>
      <CommonFooter />
    </>
  );
};

export default Main;
