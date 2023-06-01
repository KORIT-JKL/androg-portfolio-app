/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { resetCode } from "../atoms/Common/CommonAtoms";
const timer = css`
    width: 100px;
    height: 20px;
`;
const Timer = ({ mm, ss }) => {
    const [codeReset, setCodeReset] = useRecoilState(resetCode);
    const [minutes, setMinutes] = useState(parseInt(mm));
    const [seconds, setSeconds] = useState(parseInt(ss));
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);
    if (minutes === 0 && seconds === 0) {
        setCodeReset(false);
    }
    return (
        <div css={timer}>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
    );
};

export default Timer;
