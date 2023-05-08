/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";

const AccordionItem = css`
  margin: 0;
  padding: 16px 0;
`;

const accordionButton = css`
  display: flex;
  border: none;
  padding: 0px;
  padding-bottom: 10px;
  text-transform: uppercase;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  cursor: pointer;
`;

const ChevronIcon = (isOpen) => css`
  margin-top: 2px;
  &:hover {
    transform: rotate(90deg);
  }
  &:active {
    transform: ${isOpen ? "90deg" : "0"};
  }
`;

const AccordionButton = ({ isOpen, onClick, question }) => {
  return (
    <button css={accordionButton} isOpen={isOpen} onClick={onClick}>
      {question}
      <VscChevronRight css={ChevronIcon(isOpen)} />
    </button>
  );
};

const AccordionContent = css`
  max-width: 240px;
`;

const OrderCancellationText = css`
  font-weight: bold;
`;

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div css={AccordionItem}>
      <AccordionButton isOpen={isOpen} onClick={toggleAccordion} question={question} />
      {isOpen && (
        <div css={AccordionContent}>
          <span css={OrderCancellationText}>{answer}</span>
        </div>
      )}
    </div>
  );
};

export default FAQItem;
