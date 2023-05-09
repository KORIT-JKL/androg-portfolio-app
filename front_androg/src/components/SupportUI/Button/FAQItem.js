/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";

const AccordionItem = css`
  margin: 0;
  padding: 16px 0;
`;

const accordionContainer = css`
  display: flex;
  border: none;
  padding: 0px;
  padding-bottom: 10px;
`;

const accordionButton = css`
  border: none;
  padding: 0px;
  font-size: 16px;
  font-weight: 500;
  background-color: white;

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

const AccordionContent = css`
  max-width: 240px;
`;

const OrderCancellationText = css`
  font-size: 10px;
  font-weight: bold;
`;

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const AccordionButton = ({ isOpen, onClick, question }) => {
    return (
      <div css={accordionContainer}>
        {question}
        <button css={accordionButton} isOpen={isOpen} onClick={onClick}>
          <VscChevronRight css={ChevronIcon(isOpen)} />
        </button>
      </div>
    );
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
