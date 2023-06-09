/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import AddressInput from "../../Input/AddressInput";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { AdminPopUp } from "../../../atoms/Admin/AdminAtoms";

const mainContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: 100%;
`;
const header = css`
  padding: 10px;
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;
const main = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40%;
`;

const footer = css`
  padding: 10px;
  width: 100%;
  height: 20%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid black;
`;

const popUpButton = css`
  font-weight: 600;
  font-size: 17px;
  height: 50px;
  width: 100px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: grey;
  }
`;

const tableStyle = css`
  border-collapse: collapse;
  font-size: 14px;
  width: 100%;
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    &:first-of-type {
      font-weight: bold;
      line-height: 16.5px;
    }
    &:nth-of-type(2n) {
      color: #757575;
    }
  }
  th {
    background-color: #f2f2f2;
    font-weight: normal;
  }
`;

const AdminPopUpRegister = () => {
  const [popUpInput, setPopUpInput] = useState("");
  const [popUpList, setPopUpList] = useRecoilState(AdminPopUp);
  const onChangeHandle = (e) => {
    setPopUpInput(e.target.value);
  };

  const popUpRegister = useMutation(
    async () => {
      const data = {
        content: popUpInput,
      };
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.post("http://52.79.158.206/admin/pop-up/register", data, option);
      return response;
    },
    {
      onSuccess: () => {
        getPopUp.refetch();
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    }
  );

  const getPopUp = useQuery(
    ["popUpList"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://52.79.158.206/auth/pop-up", option);
      return response;
    },
    {
      onSuccess: (response) => {
        setPopUpList(response.data);
      },
    }
  );

  const popUpmodify = useMutation(
    async () => {
      const data = {
        content: popUpInput,
      };
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.put("http://52.79.158.206/admin/pop-up/modify", data, option);
      return response;
    },
    {
      onSuccess: () => {
        getPopUp.refetch();
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    }
  );
  const popUpDelete = useMutation(
    async (popUpId) => {
      const option = {
        params: {
          popUpId: popUpId,
        },
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.delete("http://52.79.158.206/admin/pop-up", option);
      return response;
    },
    {
      onSuccess: () => {
        getPopUp.refetch();
      },
    }
  );

  if (getPopUp.isLoading) {
    return <></>;
  }

  return (
    <div css={mainContainer}>
      <header css={header}>
        <h2>팝업등록 및 삭제</h2>
      </header>
      <main css={main}>
        <AddressInput
          onChange={onChangeHandle}
          value={popUpInput}
          placeholder={"등록할 팝업을 입력하세요"}
        />
        <div>
          {popUpList.content !== undefined ? (
            <button
              css={popUpButton}
              onClick={() => {
                popUpmodify.mutate();
                setPopUpInput("");
              }}
            >
              수정
            </button>
          ) : (
            <button
              css={popUpButton}
              onClick={() => {
                popUpRegister.mutate();
                setPopUpInput("");
              }}
            >
              등록
            </button>
          )}
        </div>
      </main>
      <footer css={footer}>
        <h2>팝업목록</h2>
        <table css={tableStyle}>
          <thead>
            <tr>
              <th>번호</th>
              <th>내용</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {popUpList.content !== undefined ? (
              <tr>
                <td>{popUpList.popUpId}</td>
                <td>{popUpList.content}</td>
                <td>
                  <button
                    onClick={() => {
                      popUpDelete.mutate(popUpList.popUpId);
                    }}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </footer>
    </div>
  );
};

export default AdminPopUpRegister;
