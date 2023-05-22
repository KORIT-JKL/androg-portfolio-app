/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import AddressInput from "../../Input/AddressInput";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

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

const AdminPopUpRegister = () => {
  const [popUpInput, setPopUpInput] = useState("");
  const [popUpList, setPopUpList] = useState([]);
  const onChangeHandle = (e) => {
    setPopUpInput(e.target.value);
  };

  const popUpRegister = useMutation(async () => {
    const data = {
      content: popUpInput,
    };
    const option = {
      headers: {
        Authorization: `${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.post("http://localhost:8080/admin/pop-up/register", data, option);
    return response;
  });

  const getPopUp = useQuery(
    ["popUpList"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/admin/pop-up");
      return response;
    },
    {
      onSuccess: (response) => {
        setPopUpList(response.data);
      },
    }
  );

  return (
    <div css={mainContainer}>
      <header css={header}>
        <h2>팝업등록 및 삭제</h2>
      </header>
      <main css={main}>
        <AddressInput onChange={onChangeHandle} value={popUpInput} placeholder={"등록할 팝업을 입력하세요"} />
        <div>
          <button css={popUpButton} onClick={() => popUpRegister.mutate()}>
            등록
          </button>
        </div>
      </main>
      <footer css={footer}>
        <h2>팝업목록</h2>
      </footer>
    </div>
  );
};

export default AdminPopUpRegister;
