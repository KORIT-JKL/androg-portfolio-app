/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../../components/CommonFooter/CommonFooter";
import SupprotInput from "./../../../components/SupportUI/Input/SupprotInput";
import FAQItem from "../../../components/SupportUI/Button/FAQItem";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const main = css`
  display: grid;
  grid-template-columns: repeat(12);
  padding-top: 20px;
`;

const mainContainer = css`
  grid-column-start: 7;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const inquiryContainer = css`
  grid-column-start: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 500px;
`;
const headerText = css`
  padding-bottom: 30px;
  font-size: 25px;
  font-weight: 800;
`;

const select = css`
  width: 400px;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 0;
  outline: none;
`;

const textArea = css`
  margin-bottom: 10px;
  padding: 5px;
  width: 400px;
  height: 250px;
  resize: none;
  border-radius: 0;
  outline: none;
`;

const inquiryButton = css`
  outline: none;
  width: 400px;
  height: 35px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    background-color: #aaa;
    text-decoration: underline;
  }
`;

const CustomerSupport = () => {
  const [principalState, setPrincipalState] = useState(false);
  const [orderDtlId, setOrderDtlId] = useState();
  const [category, setCategory] = useState("");
  const [inquiryContent, setInquiryContent] = useState("");
  const navigate = useNavigate();

  const inquiry = useMutation(
    ["inquiry"],
    async () => {
      const data = {
        userId: 0,
        orderId: orderDtlId,
        category: category,
        inquiryContent: inquiryContent,
      };
      const option = {
        headers: {
          "content-type": "application/json",
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.post(
        "https://port-0-androg-portfolio-app-back-7xwyjq992llitnrgqd.sel4.cloudtype.app/user/inquiry",
        data,
        option
      );

      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          alert("문의가 정상적으로 접수되었습니다.");
          setOrderDtlId("");
          setCategory("");
          setInquiryContent("");
        }
      },
      onError: (error) => {
        alert(error.response.data.message);
      },
    }
  );

  useEffect(() => {
    if (!principalState) {
      setPrincipalState(true);
    }
  }, []);

  const getOrderId = (e) => {
    setOrderDtlId(e.target.value);
  };

  const getInquiryCategory = (e) => {
    setCategory(e.target.value);
  };

  const getContent = (e) => {
    setInquiryContent(e.target.value);
  };
  const inquirySubmitHandle = () => {
    if (!!localStorage.getItem("accessToken")) {
      inquiry.mutate();
    } else {
      alert("로그인 후 이용해주세요.");
      navigate("/auth/login");
    }
  };

  return (
    <>
      <CommonHeader />
      <main css={main}>
        <div css={inquiryContainer}>
          <div css={headerText}>
            <h1>문의하기</h1>
          </div>
          <SupprotInput type="text" placeholder="orderNumber" onChange={getOrderId} value={orderDtlId} />
          <select name="" id="" css={select} onChange={getInquiryCategory} value={category}>
            <option value="">문의사항을 선택해주세요</option>
            <option value="주문상태">주문상태</option>
            <option value="반품">반품</option>
            <option value="주소변경">주소변경</option>
            <option value="배송조회">배송조회</option>
            <option value="오류문의">오류문의</option>
            <option value="기타">기타</option>
          </select>
          <textarea
            css={textArea}
            placeholder="내용을 입력하세요.200자"
            onChange={getContent}
            value={inquiryContent}
          ></textarea>
          <button css={inquiryButton} onClick={inquirySubmitHandle}>
            확인
          </button>
        </div>

        <div css={mainContainer}>
          <div css={headerText}>
            <h1>자주묻는 질문</h1>
          </div>
          <div>
            <FAQItem
              question="주문취소 절차는 어떻게 되나요?"
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 
              배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
            <FAQItem
              question="주문이 왜 취소가 된건가요?"
              answer="본인이 취소 요청하신 게 아니라면 죄송스럽게도 상품이 품절되어 발송이 불가능하거나 배송지 주소 오류로 인해 취소 될 수 있습니다.
              추가적으로 결제/ 주문 오류가 발상하여 주문 취소 될 수 있습니다."
            />
            <FAQItem
              question="반품은 어떻게 하나요?"
              answer="반품 신청은 해당 링크로 들어가셔서 반품 요청하실 수 있습니다: 반품 신청하기.
              자세한 정보는 반품 및 환불 규정 페이지에서 확인해주세요."
            />
            <FAQItem
              question="반품처리 처리 후 환불은 언제 되나요?"
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
            <FAQItem
              question="배송 주소지를 잘못 입력했는데, 변경은 어떻게 하나요?"
              answer="주문 취소를 위해 주문자명 / 주문번호 (Order #XXXXXX) 와 함께 support@androg.co.kr 로 문의해 주세요. 배송 상태에 따라 (이미 출구 준비가 완료되었거나 배송 진행중) 취소는 어려울 수 있습니다."
            />
            <FAQItem
              question="주문완료 후 수정이 가능한가요?"
              answer="보내주신 상품이 물류센터에 도착한 뒤, 2-3일 정도의 입고/검수 작업을 거쳐 환불 처리로 진행하고 있습니다. 배송비 제외.

              주문과 업무량이 몰리는 시기에는 진행 절차 시간이 영업일 기준 4-5일 이상 소요될 수 있습니다."
            />
            <FAQItem
              question="주문취소 절차는 어떻게 되나요?"
              answer="모든 주소는 한글로 입력해주세요. 구/군/시, 상세주소 포함.
              배송지 변경이 필요한 경우 support@androg.co.kr 로 요청을 할 수 있습니다만, 이미 상품 배송이 시작되었다면 변경이 어려울 수 있습니다."
            />
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default CustomerSupport;
