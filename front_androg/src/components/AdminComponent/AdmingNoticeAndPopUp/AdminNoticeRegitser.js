/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import SupprotInput from "./../../SupportUI/Input/SupprotInput";
import { useMutation, useQuery } from "react-query";
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
  margin-top: 25px;
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
  const noticeRegister = useMutation(
    async () => {
      const data = {
        ...notice,
      };
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.post("http://52.79.158.206/admin/notice/register", data, option);
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert("공지를 등록하였습니다.");
          getNotice.refetch();
        }
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    }
  );
  const noticeModify = useMutation(
    async () => {
      const data = {
        ...notice,
      };
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.put("http://52.79.158.206/admin/notice/modify", data, option);
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert("공지를 수정하였습니다.");
        }
      },
    }
  );

  const noticeDelete = useMutation(
    async (notice) => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.delete(
        `http://52.79.158.206/admin/notice/${notice.noticeId}`,
        option
      );
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert("공지를 삭제하였습니다.");
          getNotice.refetch();
        }
      },
    }
  );

  const getNotice = useQuery(
    ["getUserNotice"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://52.79.158.206/auth/notice", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setNotice(response.data);
      },
    }
  );

  const onchangeHandle = (e) => {
    const { name, value } = e.target;
    setNotice({
      ...notice,
      [name]: value,
    });
  };

  if (getNotice.isLoading) {
    return <></>;
  }

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
      {notice.noticeId !== undefined ? (
        <>
          <button
            css={inquiryButton}
            onClick={() => {
              noticeModify.mutate();
            }}
          >
            수정
          </button>
          <button
            css={inquiryButton}
            onClick={() => {
              noticeDelete.mutate(notice);
            }}
          >
            삭제
          </button>
        </>
      ) : (
        <button
          css={inquiryButton}
          onClick={() => {
            noticeRegister.mutate();
          }}
        >
          공지 등록
        </button>
      )}
    </div>
  );
};

export default AdminNoticeRegitser;
