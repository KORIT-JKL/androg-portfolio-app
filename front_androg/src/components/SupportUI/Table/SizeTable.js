/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";

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

const SizeTable = () => {
  return (
    <table css={tableStyle}>
      <tbody>
        <tr>
          <td>Androg 사이즈 (알파)</td>
          <td>XS</td>
          <td>S</td>
          <td>M</td>
          <td>L</td>
          <td>XL</td>
          <td>XXL</td>
        </tr>
        <tr>
          <td>Androg 사이즈 (숫자)</td>
          <td>28</td>
          <td>29-30</td>
          <td>31-32</td>
          <td>33-34</td>
          <td>36</td>
          <td>38</td>
        </tr>
      </tbody>
    </table>
  );
};
export default SizeTable;
