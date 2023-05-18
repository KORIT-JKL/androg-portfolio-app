/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import paymentLogoImg from '../../img/Black And White Minimalist Aesthetic Modern Simple Neon Typography Fog Store Logo.png'
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { setRefresh } from "../../atoms/authAtoms";
import { getAddressListRecoil } from "../../atoms/AddressAtoms/AddressAtoms";


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


const asideContent = css`
    display: flex;
    flex-direction: column;
`;

const cartContainer = css`
    display: flex;
    flex-direction: row;
`;

const productDescription = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 15px 0 0 20px;

`;

const cartImg = css`
    width: 100px;
    padding-top: 15px;
`;

const cartSummary = css`
    width: 100%;
    padding: 30px 0;
`;

const summaryHeader = css`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 90px;
    border-top: 1px solid #dbdbdb;
    padding: 15px 0;
`;

const summaryFooter = css`
    width: 100%;
    border-top: 1px solid #dbdbdb;
    padding-top: 15px;
`;

// url 변경 => /products/payment 
const Payment = () => {
    const [principalState, setPrincipalState] = useState(false);
    const [addressListState, setaddressListState] = useState(false);
    const [ cartListState, setCartListState] = useState(false);
    const [userAddressList, setUserAddressList ] = useState([]);
    const [ userCartList , setUserCartList] = useState([])
    const [ userCartListAllPrice, setUserCartListAllPrice] = useState();
    const [addressIndex, setAddressIndex] = useState(0);

    const principal = useQuery(["principal"], async () => {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:8080/auth/principal",
        {params: {accessToken}});
        return response;
    },
    {   
        onSuccess: ()=> {
            setPrincipalState(false);
        },
        enabled: principalState
    }
    );

    const addressList = useQuery(["addressList"], async () => {
        const option = {
            params: {
                userId: principal.data.data.userId
            }
        };
        const response = await axios.get("http://localhost:8080/user/mypage/address", option);
        return response;
    }, 
    {
        onSuccess: (response) => {
            // console.log(response.data)
            setUserAddressList([...response.data])
            setaddressListState(false)
        },
        enabled: !!principal.data && addressListState
    }
    );

    const cartList = useQuery(["cartList"], async () => {
        
        const response = await axios.get("http://localhost:8080/cart", {params:{userId: principal.data.data.userId}});
        return response;
    },
    {
        onSuccess: (response) => {
            let element = 0;
           for (let i = 0; i < response.data.length; i++) {          
                element += response.data[i].productPrice;
            }
            setUserCartListAllPrice(element)
            setUserCartList([...response.data])
            setCartListState(false)
        },
        enabled: !!principal.data && cartListState
    });
    
    useEffect(() => {
        if (!principalState) {
            setPrincipalState(true)
        }
        if(!addressListState){
            setaddressListState(true)
        }
        if(!cartListState) {
            setCartListState(true)
        }
      }, []);
    
    const clickHandle = (e) => {
        setAddressIndex(e.target.value);
       
    }


    // console.log(userAddressList)
    if(principal.isLoading && addressList.isLoading) {
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
                    <h2 css={orderUserInfo}>주문자 정보</h2>
                    <p>
                        <span>{principal.data !== undefined ? principal.data.data.name : ""}</span>
                        <span>({principal.data !== undefined ? principal.data.data.email : ""})</span>
                    </p>
                    <div css={shipping}>
                        <h2 css={shippingAddress}>배송주소</h2>
                        
                        <select css={select}  onClick={clickHandle}>
                            { !!userAddressList ?                           
                            userAddressList.map((address, index)=> {
                                return (
                                    <>
                                        <option value={index}>{address.address}</option>
                                    </>
                                    )
                            })  : <option value={userAddressList.length}>새 주소</option>}
                        </select>
                        <select css={select}>
                            <option>대한민국</option>
                        </select>
                        <input type="text" css={input} value={principal.data !== undefined ? (principal.data.data.name).substring(1) : ""}/>
                        <input type="text" css={input} value={principal.data !== undefined ? (principal.data.data.name).substring(0,1) : ""}/>
                        <div>
                            <input type="text" css={postNumInput} value={addressIndex !==0 && !!userAddressList ? userAddressList[addressIndex].addressZonecode:""}/>
                            <button css={addressSearchBtn}>주소찾기</button>
                        </div>
                       
                        {
                             addressIndex !==0 &&!!userAddressList ? 
                            <>
                            <input type="text" placeholder="구/군/시" css={input} value={userAddressList[addressIndex].addressSido + " " + userAddressList[addressIndex].addressSigungu}/>
                            <input type="text" placeholder="주소" css={input} value={userAddressList[addressIndex].address.split(' ').slice(2).join(" ")}/> 
                            </>
                             : ""  
                        } 

                        <input type="text" placeholder="상세주소" css={input} />

                        
                        <input type="text" placeholder="전화번호" css={phoneInput} />
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
                   {!!userCartList ? userCartList.map(userCart => {
                    return (
                        <>
                        <div css={cartContainer}>                        
                                <img src={userCart.productImg} css={cartImg} alt=""/>
                                <div css={productDescription}>
                                    <div>{userCart.productName}</div>
                                    <div>{userCart.colorName + " / " + userCart.sizeName}</div>
                                    <div>{userCart.productPrice}</div>
                                    <div>{"수량 : "+userCart.countNumber}</div>
                                </div>
                        </div>
                        </>
                    )
                   })
                   : ""}
                   <div css={cartSummary}>
                            <div css={summaryHeader}>
                                <div>{"총 상품금액 " + userCartListAllPrice}</div>
                                <div>{"배송비 " + 2500}</div>
                            </div>
                            <div css={summaryFooter}>
                                <div>{"총 주문금액" + (2500 + userCartListAllPrice)}</div>
                            </div>
                        </div>
                </div>
            </aside>
        </div>
        </>
    );
};

export default Payment;