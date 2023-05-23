/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import SupprotInput from "./../../SupportUI/Input/SupprotInput";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { AdminNotice } from "../../../atoms/Admin/AdminAtoms";
import axios from "axios";

const mainContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 700px;
`;

const headerText = css`
  padding: 30px;
  font-size: 25px;
  font-weight: 800;
`;

const inputbox = css`
  margin: 20px 0px 20px 0px;
  display: flex;
  justify-content: flex-start;
  width: 70%;
`;

const textArea = css`
  margin-bottom: 10px;
  padding: 5px;
  width: 70%;
  height: 50%;
  resize: none;
`;

const inquiryButton = css`
  margin: 30px 0px 30px 0px;
  outline: none;
  width: 70%;
  height: 10%;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: #aaa;
    text-decoration: underline;
  }
`;

const AdminNoticeRegitser = () => {
  const [notice, setNotice] = useRecoilState(AdminNotice);
  const noticeRegister = useMutation(async () => {
    const data = {
      ...notice,
    };
    const option = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.post("http://localhost:8080/admin/notice/register", data, option);
    return response;
  });

  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setNotice({
      ...notice,
      [name]: value,
    });
  };

  return (
    <div css={mainContainer}>
      <div css={headerText}>
        <h1>공지등록</h1>
      </div>
      <div css={inputbox}>
        <SupprotInput type="text" placeholder="제목" name="subject" onChange={onchangeHandle} />
      </div>
      <textarea
        css={textArea}
        placeholder="내용을 입력하세요"
        name="content"
        onChange={onchangeHandle}
      ></textarea>
      <button
        css={inquiryButton}
        onClick={() => {
          noticeRegister.mutate();
        }}
      >
        공지 등록
      </button>
    </div>
  );
};

export default AdminNoticeRegitser;
