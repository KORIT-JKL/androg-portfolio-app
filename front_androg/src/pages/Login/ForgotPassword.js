/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import CommonUserHeader from "../../components/CommonHeader/CommonUserHeader/CommonUserHeader";
import CommonFooter from "./../../components/CommonFooter/CommonFooter";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { resetCode } from "../../atoms/Common/CommonAtoms";
const container = css`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const inputContainer = css`
  display: flex;
  width: 600px;
  height: 800px;
  flex-direction: column;
  align-items: center;
  padding: 70px;
  margin: 50px auto;
`;
const forgotText = css`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 70px;
`;
const inputText = css`
  font-size: 20px;
  padding: 10px;
`;
const inputpassword1 = css`
  height: 40px;
  width: 410px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 15px;
  text-align: left;
`;
const input = css`
  height: 40px;
  width: 350px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 15px;
  text-align: left;
`;
const button = css`
  height: 40px;
  width: 50px;
  border: 1px solid black;
  background-color: white;
  color: black;
  margin: 5px;
  &:hover {
    background-color: #dbdbdb;
  }
  &:active {
    background-color: #fafafa;
  }
`;
const timer = css`
  width: 100px;
  height: 20px;
`;
const ForgotPassword = () => {
  const [code, setCode] = useState("");
  const [expire, setExpire] = useState(true);
  const [mailCode, setMailCode] = useState("");
  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState("");
  const [inputEmail, setInputEmail] = useState(false);
  const [openCodeInput, setOpenCodeInput] = useState(false);
  const [updatePasswordIsOpen, setUpdatePasswordIsOpen] = useState(false);
  const [modifypassword1, setmodifypassword1] = useState("");
  const [modifypassword2, setmodifypassword2] = useState("");
  const [modifyButtonIsOpen, setModifyButtonIsOpen] = useState(false);
  const navigate = useNavigate();
  const [codeReset, setCodeReset] = useRecoilState(resetCode);
  const [minutes, setMinutes] = useState(parseInt(0));
  const [seconds, setSeconds] = useState(parseInt(10));
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          clearInterval(countdown);
          setMailCode("");
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const sendMail = useMutation(
    async () => {
      alert("코드를 전송중입니다.");
      const response = await axios.post(
        "https://port-0-androg-portfolio-app-back-7xwyjq992llitnrgqd.sel4.cloudtype.app/auth/forgot",
        { email }
      );
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.data.result === 1) {
          setCodeReset(true);
          setMailCode(response.data.token);
          alert("전송이 완료되었습니다.");
          setOpenCodeInput(true);
          setInputEmail(true);
          setMinutes(3);
          setSeconds(10);
        } else {
          alert("이메일을 확인해주세요");
        }
      },
    }
  );
  const modifyPassword = useMutation(
    async () => {
      const response = await axios.post(
        "https://port-0-androg-portfolio-app-back-7xwyjq992llitnrgqd.sel4.cloudtype.app/auth/forgot/modify",
        {
          email: email,
          password: modifypassword1,
        }
      );
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert("변경이 완료 되었습니다.");
          navigate("/auth/login");
        }
      },
      onError: (error) => {
        alert(error.response.data.errorData.password);
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
  const passwordInputHandle1 = (e) => {
    setmodifypassword1(e.target.value);
  };
  const passwordInputHandle2 = (e) => {
    setmodifypassword2(e.target.value);
  };
  const checkcode = () => {
    if (code == mailCode) {
      alert("인증이 완료되었습니다.");
      setUpdatePasswordIsOpen(true);
      setCheck(true);
      setExpire(false);
    } else {
      alert("코드가 틀렸습니다.");
    }
  };
  const checkPassword = () => {
    if (modifypassword1 === modifypassword2) {
      alert("비밀번호가 일치합니다.");
      setModifyButtonIsOpen(true);
    } else {
      alert("비밀번호가 불일치 합니다.");
    }
  };

  const modifyClickHandle = () => {
    if (modifypassword1 === modifypassword2) {
      modifyPassword.mutate();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  return (
    <>
      <CommonUserHeader />
      <div css={container}>
        <div css={inputContainer}>
          <div css={forgotText}>비밀번호 찾기</div>
          <div css={inputText}>email</div>
          <div>
            <input
              type="email"
              placeholder="이메일을 입력해주세요"
              css={input}
              onChange={emailInputHandle}
              readOnly={inputEmail}
            />
            <button css={button} onClick={() => buttonClickSubmit()}>
              전송
            </button>
          </div>

          {openCodeInput ? (
            <>
              <div css={inputText}>인증번호</div>
              <div>
                <input css={input} placeholder="인증번호를 입력해주세요" onChange={codeInputHandle} />

                <button css={button} onClick={() => checkcode()}>
                  확인
                </button>
                {!check && mailCode !== "" ? (
                  <div css={timer}>
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                ) : (
                  ""
                )}

                {mailCode === "" && !check ? <div>시간만료</div> : ""}
                {check ? <div>인증완료</div> : ""}
              </div>
            </>
          ) : (
            ""
          )}

          {updatePasswordIsOpen ? (
            <>
              <div css={inputText}>비밀번호 변경</div>
              <input css={inputpassword1} onChange={passwordInputHandle1} type="password" />
              <div css={inputText}>비밀번호 확인</div>
              <div>
                <input css={input} onChange={passwordInputHandle2} type="password" />
                <button css={button} onClick={() => checkPassword()}>
                  확인
                </button>{" "}
              </div>
            </>
          ) : (
            ""
          )}

          {modifyButtonIsOpen ? (
            <button css={button} onClick={() => modifyClickHandle()}>
              변경
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <CommonFooter />
    </>
  );
};

export default ForgotPassword;
