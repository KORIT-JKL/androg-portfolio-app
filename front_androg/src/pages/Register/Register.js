/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../components/CommonFooter/CommonFooter";
import RegisterInput from "../../components/Register/RegisterInput/RegisterInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { resetCode } from "../../atoms/Common/CommonAtoms";

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 865px;
`;

const header = css`
  margin-top: 150px;
  font-size: 30px;
  font-weight: 300;
`;

const main = css`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;

const mainTxt = css`
  font-size: 12px;
  margin-bottom: 23px;
`;

const inputCss = css`
  display: flex;
  width: 100%;
`;

const errorMsg = css`
  position: absolute;
  top: 40px;
  color: red;
`;

const privacy = css`
  display: flex;
`;

const privacyBtn = css`
  margin-right: 15px;
`;
const text = css`
  font-size: 10px;
  margin-top: 4px;
`;

const footer = css`
  display: flex;
`;

const registerButton = css`
  width: 400px;
  height: 40px;
  margin-top: 40px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
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
const input = css`
  height: 40px;
  width: 400px;
  border: none;
  border-bottom: 1px solid black;
  outline: none;
  font-size: 15px;
  text-align: left;
`;
const timer = css`
  width: 100px;
  height: 20px;
`;
const Register = () => {
  const [code, setCode] = useState("");
  const [expire, setExpire] = useState(true);
  const [mailCode, setMailCode] = useState("");
  const [check, setCheck] = useState(false);
  const [checkemail, setCheckEmail] = useState("");
  const [inputEmail, setInputEmail] = useState(false);
  const [openCodeInput, setOpenCodeInput] = useState(false);
  const [updatePasswordIsOpen, setUpdatePasswordIsOpen] = useState(false);
  const navigate = useNavigate();
  const [codeReset, setCodeReset] = useRecoilState(resetCode);
  const [minutes, setMinutes] = useState(parseInt(0));
  const [seconds, setSeconds] = useState(parseInt(10));
  const [registerUser, setRegisterUser] = useState({ email: "", passowrd: "", name: "" });
  const [errorMessages, setErrorMessages] = useState({ email: "", password: "", name: "" });
  const sendMail = useMutation(
    async () => {
      alert("코드를 전송중입니다.");
      const response = await axios.post("http://52.79.158.206/auth/email", { checkemail });
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

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
    setCheckEmail(e.target.value);
  };

  const registerSubmitHandle = async () => {
    const data = {
      ...registerUser,
    };
    const option = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post("http://52.79.158.206/auth/signup", JSON.stringify(data), option);

      setErrorMessages({ email: "", password: "", name: "" });
      navigate("/auth/login");
    } catch (error) {
      setErrorMessages({ email: "", password: "", name: "", ...error.response.data.errorData });
    }
  };
  const buttonClickSubmit = () => {
    sendMail.mutate();
  };
  const codeInputHandle = (e) => {
    setCode(e.target.value);
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
  return (
    <>
      <CommonHeader />
      <div css={container}>
        <header css={header}>
          <h1>회원가입</h1>
        </header>
        <main css={main}>
          <p css={mainTxt}>
            회원으로 가입하시면 Androg 에서 운영하는 온라인 스토어의 서비스를 아이
            <br />
            디로 이용하실 수 있습니다.
          </p>
          <div css={inputCss}>
            <div>
              <RegisterInput type="email" placeholder="이메일" onChange={onChange} name="email" />
            </div>
            <div css={errorMsg}>{errorMessages.email}</div>
            <button css={button} onClick={() => buttonClickSubmit()}>
              전송
            </button>
          </div>
          {openCodeInput ? (
            <>
              <div>
                <input
                  css={input}
                  placeholder="인증번호를 입력해주세요"
                  onChange={codeInputHandle}
                />

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
              <div css={inputCss}>
                <RegisterInput
                  type="password"
                  placeholder="비밀번호"
                  onChange={onChange}
                  name="password"
                />
                <div css={errorMsg}>{errorMessages.password}</div>
              </div>
              <div css={inputCss}>
                <RegisterInput type="name" placeholder="이름" onChange={onChange} name="name" />
                <div css={errorMsg}>{errorMessages.name}</div>
              </div>
              <div css={privacy}>
                <input type="checkbox" css={privacyBtn} />
                <label css={text}>
                  <a href="/page/legal">개인정보 보호정책</a> 및 <a href="/page/legal">이용약관</a>{" "}
                  동의
                </label>
              </div>
            </>
          ) : (
            ""
          )}
        </main>
        <footer css={footer}>
          <button css={registerButton} onClick={registerSubmitHandle}>
            회원가입
          </button>
        </footer>
      </div>
      <CommonFooter />
    </>
  );
};

export default Register;
