/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import paymentLogoImg from '../../img/Black And White Minimalist Aesthetic Modern Simple Neon Typography Fog Store Logo.png'
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const container = css`
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    margin: 0 200px;
    padding: 0 10px;
    height: auto;

`;

const main = css`
    display: flex;
    flex-direction: column;
    padding: 56px 57px 0 0;
    border-right: 1px solid #dbdbdb;
`;

const logoImg = css`
    width: 80px;
    height: 70px;
`;

const mainHeader = css`
   width: 537px;
   height: 111px;
   padding-bottom: 25px;

`;
const mainContent = css`
    font-size: 12px;
    padding-bottom: 50px;
`;


const orderUserInfo = css`
 
    font-weight: bold;
    margin-bottom: 28px;
`;

const shipping = css`
    display: flex;
    flex-direction: column;
    font-weight: bold;
    padding-top: 42px;
`;

const shippingAddress = css`
    padding-bottom: 20px;
`;

const select = css`
    width: 600px;
    padding  : 10px;
    outline: none;
    margin-bottom: 10px;
    font-size: 12px;
`;

const input = css`
    margin-top: 12px;
    padding: 10px 0;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    
`;


const postNumInput = css`
    margin: 12px 0;
    padding: 10px 0;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    width: 295px;
`;

const addressSearchBtn = css`
    width: 295px;
    margin-left: 10px;
    padding: 10px 0;
    font-size: 12px;
    font-weight: bold;
    color: white;
    border-radius: 0%;
    border-style: none;
    background-color: black;
    cursor: pointer;
    &:hover {
        background-color: grey;
        transition: 0.25s;
    }
`;

const phoneInput = css`
    margin-top: 30px;
    padding: 10px 0;
    outline: none;
    border: none;
    border-bottom: 1px solid black;
`;

const continueBtn = css`
    width: 600px;
    margin-top: 30px;
    padding: 10px 0;
    font-size: 12px;
    font-weight: bold;
    color: white;
    border-radius: 0%;
    border-style: none;
    background-color: black;
    cursor: pointer;
    &:hover {
        background-color: grey;
        transition: 0.25s;
    }
`;

const mainFooter = css`
   border-top: 1px solid #dbdbdb;
   padding: 14px 0;
`;

const mainFooterList = css`
    display: flex;
    justify-content: space-around;
`;

const aside = css`
    padding: 56px 0 0 38px;
`;

const asideHeader = css`

`;

const asideContent = css`

`;


// url 변경 => /products/payment 
const Payment = () => {
    // const [ inputValue , setInputValue] = useState({phone:""});
    const [userInfoRefresh, setUserInfoRefresh] = useState(false);



    const { data, isLoading } = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/principal",
        {params: {accessToken}},
        {
            enabled: accessToken
        });
        return response;
    });

    const paymentProducts = useQuery(["payment"], async () => {
        const response = await axios.get("http://localhost:8080/products/payment",
        {params: data.data.userId},
        {
            enabled: !!data
        })
        return response;
    })

  
    // const changeHandle = (e) => {
    //     const regex = /^[0-9\b -]{0,13}$/;
    //     const {name, value} = e.target;
    //     if(regex.test(value)) {
    //         setInputValue({...inputValue, [name]:value});
    //     }
    // };

    // useEffect(()=> {
    //     if (inputValue.length === 10) {
    //         setInputValue(inputValue.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    //       }
    //       if (inputValue.length === 13) {
    //         setInputValue(inputValue.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    //       }
    // }, [inputValue])
    useEffect(()=> {
        if(!userInfoRefresh) {
            setUserInfoRefresh(true);
        }
    }, [])

    if(isLoading && paymentProducts.isLoading) {
        return <>로딩중...</>
    }
    return (
        <>
        <div css={container}>
            <div css={main}>
                <div css={mainHeader}> 
                    <a href="/"><img src={paymentLogoImg} alt="" css={logoImg} /></a>
                </div>
                <div css={mainContent}>
                    <h2 css={orderUserInfo}>주문자</h2>
                    <p>
                        <span>{data.data.name}</span>
                        <span>({data.data.email})</span>
                    </p>
                    <div css={shipping}>
                        <h2 css={shippingAddress}>배송주소</h2>
                        
                        <select name="" id="" css={select}>
                            <option value="">부산광역시 남구 못골로53번길 50  (대연동, 에스원), 204호, 48438 남구, 부산광역시, 대한민국 (강 의진)</option>
                            <option value="">새 주소</option>
                        </select>
                        <select name="" id="" css={select}>
                            <option value="">대한민국</option>
                        </select>
                        <input type="text" css={input}/>
                        <input type="text" css={input}/>
                        <div>
                            <input type="text" css={postNumInput}/>
                            <button css={addressSearchBtn}>주소찾기</button>
                        </div>
                        <select name="" id="" css={select}>
                            <option disabled>시/도</option>
                            <option value="">강원도</option>
                            <option value="">경기도</option>
                            <option value="">경상남도</option>
                            <option value="">경상북도</option>
                            <option value="">광주광역시</option>
                            <option value="">대구광역시</option>
                            <option value="">부산광역시</option>
                            <option value="">서울특별시</option>
                            <option value="">세종특별자치시</option>
                            <option value="">울산광역시</option>
                            <option value="">인천광역시</option>
                            <option value="">전라남도</option>
                            <option value="">전라북도</option>
                            <option value="">제주특별자치도</option>
                            <option value="">충청남도</option>
                            <option value="">충청북도</option>
                        </select>
                        <input type="text" placeholder="구/군/시" css={input}/>
                        <input type="text" placeholder="주소" css={input}/>
                        <input type="text" placeholder="상세주소" css={input}/>
                        <input type="text" placeholder="전화번호" css={phoneInput}/>
                        <button css={continueBtn}>결제하기</button>
                    </div>
                </div>

                <div css={mainFooter}>
                    <ul css={mainFooterList}>
                        <li>환불 정책</li>
                        <li>배송 정책</li>
                        <li>개인보호 보호정책</li>
                        <li>이용약관</li>
                    </ul>
                </div>
            </div>
            <aside css={aside}>
                <div css={asideContent}>
                    
                </div>
            </aside>
        </div>
        </>
    );
};

export default Payment;