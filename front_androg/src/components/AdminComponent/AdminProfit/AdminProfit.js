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
    console.log(dateTotalPriceData);
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
                console.log(response);
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
                setCountData([
                    {
                        productName: response.data[0].productName + " " + response.data[0].colorName,
                        count: response.data[0].totalCount,
                        countColor: "hsl(0, 0%, 70%)",
                    },
                    {
                        productName: response.data[1].productName + " " + response.data[1].colorName,
                        count: response.data[1].totalCount,
                        countColor: "hsl(286, 70%, 50%)",
                    },
                    {
                        productName: response.data[2].productName + " " + response.data[2].colorName,
                        count: response.data[2].totalCount,
                        countColor: "hsl(256, 70%, 50%)",
                    },
                    {
                        productName: response.data[3].productName + " " + response.data[3].colorName,
                        count: response.data[3].totalCount,
                        countColor: "hsl(173, 70%, 50%)",
                    },
                    {
                        productName: response.data[4].productName + " " + response.data[4].colorName,
                        count: response.data[4].totalCount,
                        countColor: "hsl(174, 70%, 50%)",
                    },
                ]);
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
                setPriceData([
                    {
                        productName: response.data[0].productName + " " + response.data[0].colorName,
                        totalPrice: response.data[0].totalPrice,
                        countColor: "hsl(0, 0%, 70%)",
                    },
                    {
                        productName: response.data[1].productName + " " + response.data[1].colorName,
                        totalPrice: response.data[1].totalPrice,
                        countColor: "hsl(286, 70%, 50%)",
                    },
                    {
                        productName: response.data[2].productName + " " + response.data[2].colorName,
                        totalPrice: response.data[2].totalPrice,
                        countColor: "hsl(256, 70%, 50%)",
                    },
                    {
                        productName: response.data[3].productName + " " + response.data[3].colorName,
                        totalPrice: response.data[3].totalPrice,
                        countColor: "hsl(173, 70%, 50%)",
                    },
                    {
                        productName: response.data[4].productName + " " + response.data[4].colorName,
                        totalPrice: response.data[4].totalPrice,
                        countColor: "hsl(174, 70%, 50%)",
                    },
                ]);
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
    console.log(userRankList);
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
                                <tr key={list.rank}>
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
                                <tr key={list.rank}>
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
