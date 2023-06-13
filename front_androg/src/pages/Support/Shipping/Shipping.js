/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/commonHeader/CommonHeader";
import CommonFooter from "../../../components/commonFooter/CommonFooter";
import Information from "../../../components/SupportUI/Information/Information";

const container = css`
  display: flex;
  justify-content: space-between;
  flex-direction: center;
  align-items: center;
  margin: 0px;
  max-width: 100%;
  height: 1000px;
`;

const header = css`
  padding-bottom: 40px;
  width: 320px;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
`;

const orderContent = css`
  padding: 10px;
  margin: 5px;
  max-width: 40%;
  height: 100%;
`;

const returnContent = css`
  padding: 10px;
  margin: 5px;
  max-width: 40%;
  height: 100%;
`;

const Shipping = () => {
  return (
    <>
      <CommonHeader />
      <main css={container}>
        <div css={orderContent}>
          <header css={header}>
            <h1>주문 및 배송 정보</h1>
          </header>
          <Information
            title="배송안내"
            message="주문 폭주로 인해 배송이 지연될 수 있는 점 참고 부탁드립니다."
            listItems={["평소보다 3-5일 정도 소요 예정입니다.", "최대한 빨리 출고할 수 있도록 노력하겠습니다."]}
          />
          <Information
            title="결제 가이드"
            message=""
            listItems={[
              "kr.stussy.com 에서 신용카드 / 실시간 계좌이체 방식으로 결제 가능합니다.",
              "맥에서는 결제가 원활하지 않을 수 있으며, 윈도우와 인터넷 익스플로러에 최적화되어 있습니다.",
            ]}
          />
          <Information
            title="주문내역"
            message="kr.androg.com 에서 접수된 주문건은 평일 오전 9시부터 오후 4시까지 (공휴일 제외) 처리 되며, 접수일로부터 1-2 영업일 내로 출고됩니다."
            listItems={[
              "주문이 접수 되었을때 결제 내역과 주문번호가 기재된 확인서가 메일로 전송됩니다.",
              "상품이 출고되는대로 운송장 정보가 담긴 안내 메세지를 발송해드리고 있습니다.",
              "메일을 못받으셨다면 스팸 메일함을 확인 부탁드립니다.",
            ]}
          />
          <Information
            title="배송비"
            message=""
            listItems={[
              "7만원 이하의 주문건 배송비 ₩2,500",
              "7만원 이상 무료배송 (Nike 제외)",
              "나이키 제품은 무료배송에서 제외이며 고정 배송비는 ₩2,500 입니다.",
            ]}
          />
          <Information
            title="주문 취소"
            message="주문 취소를 요청할 때의 상황에 따라 취소 불가할 수 있습니다."
            listItems={[
              "상품이 출고 또는 배송되기 전까지 주문취소가 가능합니다.",
              "출고 준비가 완료된 주문과 배송 단계에 있는 주문건의 경우 취소가 불가할 수 있습니다.",
              "주문이 취소된 경우 환불까지 2-3 영업일이 소요됩니다. 이후에도 환불처리 되지 않을 시, 고객 지원에게 연락 바랍니다.",
              "취소 관련 문의는 support@androg.co.kr 로 영업일 오전 9시부터 오후 4시까지 문의해주시기 바랍니다.",
            ]}
          />
        </div>
        <div css={returnContent}>
          <header css={header}>
            <h1>반품 및 환불 규정</h1>
          </header>
          <Information
            title="온라인 구매 반품안내"
            message="kr.androg.com 에서 주문하신 상품은 온라인에서만 반품이 가능합니다. 서울 챕터 매장으로 온라인 구매와 관련한 문의를 할 수 없습니다 꼭 참고해주시기 바랍니다."
            listItems={[]}
          />
          <Information
            title="반품 신청 안내"
            message="반품 신청은 해당 링크로 반품 요청하실 수 있습니다."
            listItems={[
              "리턴 라벨을 따로 제공하지 않습니다.(반품 예약 고객부담)",
              "가능하면 □□택배를 이용해 반송해주시기 바랍니다.",
              "반품 예약시 택배사에 직접 접수하셔서 반품을 보내주셔야 합니다.",
              "반품 확인 후 택배비를 제외 한 금액을 부분 취소 처리 해드립니다.",
              "자세한 반품 절차는 접수 후 자동 이메일로 전달해 드립니다.",
            ]}
          />
          <Information title="아래 정보를 기입해 주세요" message="" listItems={["이메일", "주문번호"]} />
          <Information
            title="반품 규정"
            message="반품 요청은 7일 이내에 가능합니다."
            listItems={[
              "반품할 제품을 원래 배송되었던 포장 상태 그대로 박스 및 종이봉투 안에 담아 주세요.",
              "상품을 사용하지 않은 상태에서 택을 제거하지 않고 반송하여 주십시오. 태그 제거 및 착용 발견시 반품은 불가합니다.",
              "브랜드 고유 태그가 부착되어 배송되었다면, 태그가 부착된 상태 그대로 반품해 주셔야 합니다.",
              "반송시 동봉된 인보이스 혹은 주문번호/주문자를 확인 할 수 있는 메모를 꼭 동봉해주시기 바랍니다.",
              "반품 보내주신 상품들은 배송완료 뜬 날짜로부터 스투시 창고로 도착하는데는 일정시간 소요되는 점 참고바랍니다.",
              "상품 검수를 거쳐 이상이 없는 경우 결제수단과 동일한 방법으로 환불 처리됩니다 (배송료 환불 불가).",
              "반품시 훼손이나 파손될 우려가 있는 상품은 재포장에 유의하여 반송해주시기 바랍니다.",
              "속옷, 양말, 기타 악세서리류는 반품 및 환불이 불가합니다.",
            ]}
          />
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default Shipping;
