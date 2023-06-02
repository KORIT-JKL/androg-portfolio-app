/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const graph = css`
    width: 100%;
    height: 400px;
`;

const Graph = ({ data, ylabel }) => {
    return (
        <div css={graph}>
            <ResponsiveBar
                data={data}
                keys={[ylabel]}
                indexBy="productName"
                margin={{ top: 50, right: 100, bottom: 50, left: 70 }}
                padding={0.7}
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "dark2" }}
                colorBy="id"
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#1d1d1f",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                // fill={[
                //     {
                //         match: {
                //             id: "fries",
                //         },
                //         id: "dots",
                //     },
                //     {
                //         match: {
                //             id: "sandwich",
                //         },
                //         id: "lines",
                //     },
                // ]}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "productName",
                    legendPosition: "middle",
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: ylabel,
                    legendPosition: "middle",
                    legendOffset: -65,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                legends={[
                    {
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={(e) => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </div>
    );
};

export default Graph;
