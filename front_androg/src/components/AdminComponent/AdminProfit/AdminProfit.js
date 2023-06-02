/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Graph from "../../Graph/Graph";
import LineGraph from "../../Graph/LineGraph";
const container = css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 80%;
    height: 100%;
`;
const tableTitleText = css`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
`;
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

const AdminProfit = () => {
    const [countRankList, setCountRankList] = useState([]);
    const [profitRankList, setProfitRankList] = useState([]);
    const [userRankList, setUserRankList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [countData, setCountData] = useState([]);
    const [priceData, setPriceData] = useState([]);
    const [dateTotalPriceData, setDateTotalPriceData] = useState([]);
    const option = {
        headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
        },
    };
    const getDateTotalPrice = useQuery(
        ["getDateTotalPrice"],
        async () => {
            const response = await axios.get("http://localhost:8080/admin/rank/date", option);
            return response;
        },
        {
            onSuccess: (response) => {
                const newData = [];
                response.data.forEach((item) => {
                    newData.push({
                        x: item.date,
                        y: item.totalDatePrice,
                    });
                });
                setDateTotalPriceData([
                    {
                        id: "dateTotalPrice",
                        color: "hsl(151, 70%, 50%)",
                        data: newData,
                    },
                ]);
            },
        }
    );
    const getCountRank = useQuery(
        ["getCountRank"],
        async () => {
            const response = await axios.get("http://localhost:8080/admin/rank/count", option);
            return response;
        },
        {
            enabled: refresh,
            onSuccess: (response) => {
                setCountRankList(response.data);
                const countData = [];

                response.data.forEach((item, index) => {
                    const data = {
                        productName: `${item.productName} ${item.colorName}`,
                        count: item.totalCount,
                        countColor: `hsl(${index * 70}, 70%, 50%)`,
                    };

                    countData.push(data);
                });

                setCountData(countData);
                setRefresh(false);
            },
        }
    );
    const getProfitRank = useQuery(
        ["getProfitRank"],
        async () => {
            const response = await axios.get("http://localhost:8080/admin/rank/profit", option);
            return response;
        },
        {
            enabled: refresh,
            onSuccess: (response) => {
                setProfitRankList(response.data);
                const priceData = [];

                response.data.forEach((item, index) => {
                    const data = {
                        productName: `${item.productName} ${item.colorName}`,
                        totalPrice: item.totalPrice,
                        countColor: `hsl(${index * 70}, 70%, 50%)`,
                    };

                    priceData.push(data);
                });

                setPriceData(priceData);
                setRefresh(false);
            },
        }
    );
    const getUserRank = useQuery(
        ["getUserRank"],
        async () => {
            const response = await axios.get("http://localhost:8080/admin/rank/user", option);
            return response;
        },
        {
            enabled: refresh,
            onSuccess: (response) => {
                setUserRankList(response.data);
                setRefresh(false);
            },
        }
    );
    return (
        <>
            <div css={container}>
                <div css={tableTitleText}>일자별 총 매출액</div>
                <LineGraph data={dateTotalPriceData} />
                <div css={tableTitleText}>판매량 순위</div>
                <table css={tableStyle}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>상품명</th>
                            <th>색상</th>
                            <th>상품 가격</th>
                            <th>상품 판매량</th>
                            <th>상품 판매총이익</th>
                        </tr>
                    </thead>
                    {countRankList !== null ? (
                        <tbody>
                            {countRankList.map((list) => (
                                <tr>
                                    <td>{list.rank}</td>
                                    <td>{list.productName}</td>
                                    <td>{list.colorName}</td>
                                    <td>{list.productPrice}원</td>
                                    <td>{list.totalCount}개</td>
                                    <td>{list.totalPrice}원</td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        ""
                    )}
                </table>
                {!!countRankList ? <Graph data={countData} ylabel={"count"} /> : ""}
                <div css={tableTitleText}>매출 순위</div>
                <table css={tableStyle}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>상품명</th>
                            <th>색상</th>
                            <th>상품 가격</th>
                            <th>상품 판매량</th>
                            <th>상품 판매총이익</th>
                        </tr>
                    </thead>
                    {profitRankList !== null ? (
                        <tbody>
                            {profitRankList.map((list) => (
                                <tr>
                                    <td>{list.rank}</td>
                                    <td>{list.productName}</td>
                                    <td>{list.colorName}</td>
                                    <td>{list.productPrice}원</td>
                                    <td>{list.totalCount}개</td>
                                    <td>{list.totalPrice}원</td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        ""
                    )}
                </table>
                {!!profitRankList ? <Graph data={priceData} ylabel={"totalPrice"} /> : ""}
                <div css={tableTitleText}>결재액 순위</div>
                <table css={tableStyle}>
                    <thead>
                        <tr>
                            <th>순위</th>
                            <th>이름</th>
                            <th>email</th>
                            <th>주문개수</th>
                            <th>결제액</th>
                        </tr>
                    </thead>
                    {userRankList !== null ? (
                        <tbody>
                            {userRankList.map((list) => (
                                <tr key={list.name}>
                                    <td>{list.rank}</td>
                                    <td>{list.name}</td>
                                    <td>{list.email}</td>
                                    <td>{list.totalCount}개</td>
                                    <td>{list.totalPrice}원</td>
                                </tr>
                            ))}
                        </tbody>
                    ) : (
                        ""
                    )}
                </table>
            </div>
        </>
    );
};

export default AdminProfit;
