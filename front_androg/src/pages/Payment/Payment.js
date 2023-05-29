/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import paymentLogoImg from "../../img/Black And White Minimalist Aesthetic Modern Simple Neon Typography Fog Store Logo.png";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import Checkbox from "../../components/Payment/CheckBox/Checkbox";
import { useNavigate } from "react-router-dom";
import { orderProductsState } from "../../atoms/Product/ProductAtoms";
import { useRecoilState } from "recoil";
import { cartIsOpenState } from "../../atoms/Cart/CartAtoms";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { postcodeScriptUrl } from "react-daum-postcode/lib/loadPostcode";
import Select from "../../components/Payment/select/Select";

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
  padding: 10px;
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
  const [addressIndex, setAddressIndex] = useState(0);
  const [userAddressList, setUserAddressList] = useState([]);
  const [userAddressSigungu, setUserAddressSigungu] = useState();
  const [userAddressSido, setUserAddressSido] = useState();
  const [userAddressZonecode, setUserAddressZonecode] = useState();
  const [userAddressDetail, setUserAddressDetail] = useState();
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState();
  const [userAddressId, setUserAddressId] = useState();
  const [cartListState, setCartListState] = useState(false);
  const [userCartList, setUserCartList] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useRecoilState(cartIsOpenState);
  const [orderParams, setOrderParams] = useState({
    userId: 0,
    products: [],
    addressId: userAddressId,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [newAddress, setNewAddress] = useState({
    userId: 0,
    address: "",
    addressSigungu: "",
    addressSido:"",
    addressZonecode: "",
    addressDetail: "",
    poneNumber: "",
  });

  const open = useDaumPostcodePopup(postcodeScriptUrl);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const principal = useQuery(
    ["principal"],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/auth/principal", option);
      return response;
    },
    {
      onSuccess: () => {
        setPrincipalState(false);
      },
      enabled: principalState,
    }
  );

  const addressList = useQuery(
    ["addressList"],
    async () => {
      const option = {
        params: {
          userId: principal.data.data.userId,
        },
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get("http://localhost:8080/user/mypage/address", option);
      return response;
    },
    {
      onSuccess: (response) => {
        console.log(response)
          if(response.data.length !== 0) {
            setUserAddressId(response.data[addressIndex].addressId);
            setUserAddressDetail(response.data[addressIndex].addressDetail);
            setUserAddressSido(response.data[addressIndex].addressSido);
            setUserAddressSigungu(response.data[addressIndex].addressSigungu);
            setUserAddressZonecode(response.data[addressIndex].addressZonecode);
            setUserAddress(response.data[addressIndex].address);
            setUserPhone(response.data[addressIndex].poneNumber);
            setUserAddressList([...response.data]);
          }
          setaddressListState(false);
      },
      enabled: !!principal.data && addressListState,
    }
  );

  const addAddress = useMutation( async () => {
  
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.post("http://localhost:8080/user/mypage/address", 
    newAddress,
    option);
    return response;
  },
  {
    onSuccess: () => {
      setaddressListState(true);
      queryClient.fetchQuery("addressList");
    }
  });


  const cartList = useQuery(
    ["cartList"],
    async () => {
      const option = {
        params: { userId: principal.data.data.userId },
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      };
      const response = await axios.get(
        "http://localhost:8080/cart",

        option
      );
      return response;
    },
    {
      onSuccess: (response) => {
        setUserCartList([...response.data]);
        setCartListState(false);
      },
      enabled: !!principal.data && cartListState,
    }
  );

  const orderBuy = useMutation(
    async () => {
      const response = axios.post("http://localhost:8080/products/order", orderParams, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      return response;
    },
    {
      onSuccess: (response) => {
        if (response.status === 200) {
          // queryClient.fetchQuery("orderProducts");
          setCartIsOpen(false);
          navigate("/user/mypage");
        }
      },
    }
  );

  const handleComplete = (data) => {
    console.log(data.sido);
    setNewAddress((prevState) => ({...prevState,
                  userId: principal.data.data.userId,
                  address: data.address,
                  addressSigungu: data.sigungu,
                  addressSido: data.sido,
                  addressZonecode: data.zonecode,
                  addressDetail: "",
                  poneNumber:""}));
  };
  
  const handleClose = (state) => {
    if(state === 'FORCE_CLOSE') {
      console.log(newAddress);
    } else if (state === 'COMPLETE_CLOSE') {
      addAddress.mutate();
    }
  };
  
  const handleClick = () => {
    open({onComplete: handleComplete, onClose:handleClose});
  };

  useEffect(() => {
    if (!principalState) {
      setPrincipalState(true);
    }
    if (!addressListState) {
      setaddressListState(true);
    }
    if (!cartListState) {
      setCartListState(true);
    }
  }, [addressIndex]);

  useEffect(() => {
    let sum = 0;
    orderParams.products.forEach((product) => {
      sum += product.productPrice * product.countNumber;
    });
    setTotalPrice(sum);
  }, [orderParams]);

  const orderSubmitHandle = () => {
    orderBuy.mutate();
  };

  const clickHandle = (e) => {
    setAddressIndex(e.target.value);
  };

  const getCheckBoxState = (e) => {
    setTotalPrice(0);
    const { id, checked } = e.target;
    if (e.target.checked) {
      setOrderParams({
        userId: principal.data.data.userId,
        products: [
          ...orderParams.products,
          ...cartList.data.data.filter((cart) => cart.cartId === parseInt(e.target.id)),
        ],
        addressId: userAddressId,
      });
    } else {
      setOrderParams({
        userId: principal.data.data.userId,
        products: [...orderParams.products.filter((product) => product.cartId !== parseInt(e.target.id))],
      });
    }
  };



  if (principal.isLoading && addressList.isLoading) {
    return <>로딩중...</>;
  }
  return (
    <>
      <div css={container}>
        <div css={main}>
          <div css={mainHeader}>
            <a href="/">
              <img src={paymentLogoImg} alt="" css={logoImg} />
            </a>
          </div>
          <div css={mainContent}>
            <h2 css={orderUserInfo}>주문자 정보</h2>
            <p>
              <span>{principal.data !== undefined ? principal.data.data.name : ""}</span>
              <span>({principal.data !== undefined ? principal.data.data.email : ""})</span>
            </p>
            <div css={shipping}>
              <h2 css={shippingAddress}>배송주소</h2>

              <select css={select} onChange={clickHandle}>
              
                {userAddressList.map((address, index) => (
                        <>
                          <option value={index}>{address.address}</option>
                        </>
                      )
                    )}
              </select>
              <select css={select}>
                <option>대한민국</option>
              </select>
              <input
                type="text"
                css={input}
                value={principal.data !== undefined ? principal.data.data.name : ""}
              />
              <div>
                <input type="text" css={postNumInput} value={userAddressZonecode} placeholder="우편번호"/>
                <button 
                  css={addressSearchBtn} 
                  onClick={handleClick}
                >
                  주소찾기
              </button>
              </div>
             <Select css={select} sido={userAddressSido}/>       
             <input
                type="text"
                placeholder="구/군/시"
                css={input}
                value={userAddressSigungu}
                />
              {/* <input
              type="text"
                placeholder="시/도"
                css={input}
                value={userAddressSido}
              />  */}
              <input
                type="text"
                placeholder="주소"
                css={input}
                value={userAddress}
              />
              <input type="text" placeholder="상세주소" css={input} value={userAddressDetail} onChange={(e)=>{setUserAddressDetail(e.target.value)}}/>
             
              <input type="text" placeholder="전화번호" css={input} value={userPhone} onChange={(e)=>{setUserPhone(e.target.value)}}/>
              <button css={continueBtn} onClick={orderSubmitHandle}>
                주문하기
              </button>
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
            {!!userCartList
              ? userCartList.map((userCart) => {
                  return (
                    <>
                      <div css={cartContainer}>
                        <img src={userCart.productImg} css={cartImg} alt="" />
                        <div css={productDescription}>
                          <div>{userCart.productName}</div>
                          <div>{userCart.colorName + " / " + userCart.sizeName}</div>
                          <div>{userCart.productPrice}</div>
                          <div>{"수량 : " + userCart.countNumber}</div>
                          <Checkbox id={userCart.cartId} onChange={getCheckBoxState} />
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
            <div css={cartSummary}>
              <div css={summaryHeader}>
                <div>{"총 상품금액 " + totalPrice}</div>
                <div>{"배송비 " + 2500}</div>
              </div>
              <div css={summaryFooter}>
                <div>{"총 주문금액 " + (2500 + totalPrice)}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Payment;
