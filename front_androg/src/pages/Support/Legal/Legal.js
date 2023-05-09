/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import CommonHeader from "../../../components/CommonHeader/CommonHeader";
import CommonFooter from "../../../components/CommonFooter/CommonFooter";
import FAQItem from "./../../../components/SupportUI/Button/FAQItem";
import Information from "../../../components/SupportUI/Information/Information";

const container = css`
  display: flex;
  justify-content: space-between;
  flex-direction: center;
  align-items: center;
  margin: 10px;
  padding: 120px 0px 0px 50px;
  max-width: 100%;
  height: 1000px;
`;

const header = css`
  padding-bottom: 40px;
  max-width: 100%;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
`;

const orderContent = css`
  padding: 10px;
  margin: 5px;
  max-width: 100%;
  height: 100%;
`;

const Legal = () => {
  return (
    <>
      <CommonHeader />
      <main css={container}>
        <div css={orderContent}>
          <header css={header}>
            <h1>LEGAL</h1>
          </header>
          <div>
            <FAQItem
              question="이용약관"
              answer={
                <Information
                  title="제1조(목적)"
                  message="이 페이지는 팀프로젝트 포트폴리오 입니다."
                  listItems={[
                    "androg라는 가상의 쇼핑몰",
                    "작업과 책임 나누기: 팀 프로젝트를 수행할 때 구성원은 개인의 강점에 따라 작업과 책임을 나누어 프로젝트를 보다 효율적이고 효과적으로 만들 수 있습니다.",
                    "아이디어 공유 및 피드백 : 팀원들이 아이디어를 공유하고 서로의 작업에 대한 피드백을 제공하여 고객의 니즈에 잘 맞는 쇼핑몰로 이어집니다.",
                    "책임감을 키우기 위해: 팀 프로젝트를 진행하면 구성원이 자신의 작업뿐만 아니라 전체 프로젝트를 성공적으로 완료할 책임이 있으므로 책임감이 생깁니다.",
                    "의사소통 기술 향상: 팀 구성원이 협업할 때 서로 효과적으로 의사소통해야 합니다. 이를 통해 의사소통 기술을 개발하고 향후 다른 사람들과 더 효과적으로 작업할 수 있습니다.",
                    "문제 해결 능력 향상: 팀 프로젝트는 종종 구성원들이 문제 해결을 위해 협력해야 하며, 이는 문제 해결 능력을 개발하고 창의적으로 생각하는 데 도움이 될 수 있습니다.",
                    "더 나은 최종 결과를 만들기 위해: 팀 구성원은 자원을 모으고, 아이디어를 공유하고, 다양한 관점을 활용하여 개인이 만들 수 있는 것보다 더 종합적이고, 다재다능하며, 성공적인 쇼핑몰을 만들 수 있습니다.",
                    "리더십 기술 개발: 팀 프로젝트를 수행할 때 구성원은 리더십 역할을 맡을 기회가 있을 수 있으며, 이를 통해 리더십 기술을 개발하고 미래의 리더십 직책을 준비하는 데 도움이 될 수 있습니다.",
                  ]}
                />
              }
            />
            <FAQItem
              question="개인정보 보호정책"
              answer={
                <Information
                  title="없음"
                  message="스투시 쇼핑몰 사이트를 참고하였음"
                  listItems={["아직 정해지지 않음"]}
                />
              }
            />
          </div>
        </div>
      </main>
      <CommonFooter />
    </>
  );
};

export default Legal;
