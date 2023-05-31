import axios from "axios";
import React, { useState } from "react";
import { useMutation } from "react-query";

const ForgotPassword = () => {
  const [code, setCode] = useState("");
  const [mailCode, setMailCode] = useState("");
  const [email, setEmail] = useState("");
  const [openCodeInput, setOpenCodeInput] = useState(false);
  const [updatePasswordIsOpen, setUpdatePasswordIsOpen] = useState(false);
  const sendMail = useMutation(
    async () => {
      const response = await axios.post("http://localhost:8080/auth/forgot", { email });
      console.log(response);
      return response;
    },
    {
      onSuccess: (response) => {
        setMailCode(response.data.token);
        alert("전송이 완료되었습니다.");
        setOpenCodeInput(true);
      },
    }
  );
  const buttonClickSubmit = () => {
    sendMail.mutate();
  };
  const codeInputHandle = (e) => {
    setCode(e.target.value);
  };
  const emailInputHandle = (e) => {
    setEmail(e.target.value);
  };
  const checkcode = () => {
    if (code == mailCode) {
      alert("인증이 완료되었습니다.");
      setUpdatePasswordIsOpen(true);
    } else {
      alert("코드가 틀렸습니다.");
    }
  };
  console.log(code);
  console.log(mailCode);
  return (
    <div>
      <input type="email" placeholder="이메일을 입력해주세요" onChange={emailInputHandle} />
      <button onClick={() => buttonClickSubmit()}>전송</button>
      {openCodeInput ? (
        <>
          {" "}
          <input onChange={codeInputHandle} />
          <button onClick={() => checkcode()}>확인</button>
        </>
      ) : (
        ""
      )}
      {updatePasswordIsOpen ? (
        <>
          <input /> <button>변경</button>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ForgotPassword;
