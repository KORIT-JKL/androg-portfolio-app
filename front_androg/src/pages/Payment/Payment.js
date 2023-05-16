/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import paymentLogoImg from '../../img/Black And White Minimalist Aesthetic Modern Simple Neon Typography Fog Store Logo.png'

const main = css`
    display: flex;
    flex-direction: column;
`;

const logoImg = css`
    width: 80px;
    height: 70px;
    margin-top: 50px;
`;

const mainHeader = css`
   
`;
const mainContent = css`
   
`;
const mainFooter = css`
   
`;

const aside = css`

`;

const asideHeader = css`

`;

const asideContent = css`

`;


// url 변경 => /products/payment 
const Payment = () => {
    return (
        <div>
            <div css={main}>
                <div css={mainHeader}>
                    <img src={paymentLogoImg} css={logoImg}/>
                </div>
                <div css={mainContent}>

                </div>
                <div css={mainFooter}>

                </div>
            </div>
            <div css={aside}>
                <div css={asideHeader}>

                </div>
                <div css={asideContent}></div>
            </div>
        </div>
    );
};

export default Payment;