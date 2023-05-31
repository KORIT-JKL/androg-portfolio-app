/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import CommonFooter from '../../components/CommonFooter/CommonFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import QueryString from 'qs';
import ReviewComponent from '../../components/ReviewComponent/ReviewComponent';
import { setRefresh } from '../../atoms/Common/CommonAtoms';
import { SetAdminReviews } from '../../atoms/Product/ProductAtoms';
const container = css`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 1500px;
  height: 100%;
  margin: auto;
`;
const imgContainer = css`
  margin: 20px;
  width: 50%;
  height: 100%;
`;

const img = css`
  width: 100%;
  height: 900px;
`;
const detailsContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 30%;
  height: 100%;
  margin: 100px 20px;
  padding-left: 30px;
  padding-top: 20px;
`;
const sameNameProductsContainer = css`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  height: auto;
  margin-bottom: 20px;
`;
const sameNameProductsImg = css`
  height: 100%;
  width: 80px;
  padding: 5px;
  top: 5px;
  cursor: pointer;
  &:hover {
    background-color: #dbdbdb;
  }
`;
const detailTop = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: left;
`;
const productName = css`
  font-size: 30px;
  font-weight: 600;
`;

const productPrice = css`
  font-size: 15px;
  padding: 10px;
`;
const sizeContainer = css`
  display: flex;
  padding: 10px;
  width: 100%;
  border-top: 1px solid #dbdbdbff;
  border-bottom: 1px solid #dbdbdbff;
`;
const selectSizeContainer = css`
  display: flex;
  padding: 8.3px;
  width: 100%;
`;
const productSize = css`
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
const detailBottom = css`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 1px solid #dbdbdbff;
`;
const delivery = css`
  font-size: 15px;
`;
const shippingContainer = css`
  display: flex;
  justify-content: left;
  flex-direction: column;
  width: 100%;
  margin: 10px;
`;
const buttonList = css`
  position: fixed;
  display: flex;
  z-index: 99;
  height: 50px;
  width: 700px;
  left: 59%;
  top: 85%;
  margin: 10px;
`;
const addCartText = css`
  height: 100%;
  width: 30%;
  margin: 5px;
  background-color: black;
  font-size: 20px;
  font-weight: 300;
  color: white;
  cursor: pointer;
  transition: 0.75s;
  &:hover {
    background-color: grey;
  }
`;

const cartText = css`
  height: 100%;
  width: 30%;
  margin: 5px;
  background-color: white;
  font-size: 20px;
  font-weight: 300;
  color: balck;
  transition: 0.75s;
  &:hover {
    background-color: white;
  }
`;
const directBuyText = css`
  height: 100%;
  width: 30%;
  margin: 5px;
  background-color: white;
  font-size: 20px;
  font-weight: 300;
  color: black;
  cursor: pointer;
  transition: 0.75s;
  &:hover {
    background-color: black;
    color: white;
  }
`;
const shippingText = css`
  font-size: 17px;
  cursor: pointer;
  margin-bottom: 15px;
  &:hover {
    font-weight: 600;
  }
`;
const shippingSubText = css`
  padding: 10px 0px;
  font-size: 15px;
  border-top: 1px solid #dbdbdbff;
  transition: 1s;
`;
const ProductDetails = () => {
  const [refresh, setThiRefresh] = useRecoilState(setRefresh);
  const [product, setProduct] = useState();
  const [shippingIsOpen, setShippingIsOpen] = useState(false);
  const { productId } = useParams();
  const [searchParams, setSearchparams] = useState({
    userId: 0,
    productId: productId,
    sizeName: '',
    countNumber: 1,
  });
  const [selectSize, setSelectSize] = useState(false);
  const [userId, setUserId] = useState(0);

  const [sameNameProducts, setSameNameProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewsIdList, setreviewIdList] = useState([]);
  const [adminReviews, setThisAdminReviews] = useRecoilState(SetAdminReviews);
  const navigate = useNavigate();
  // const principal = useQuery(
  //     ["principal"],
  //     async () => {
  //         const option = {
  //             headers: {
  //                 Authorization: localStorage.getItem("accessToken"),
  //             },
  //         };
  //         const response = await axios.get("http://localhost:8080/auth/principal", option);
  //         return response;
  //     },
  //     {
  //         onSuccess: (response) => {
  //             setUserId(response.data.userId);
  //             setSearchparams({ ...searchParams, userId: response.data.userId });
  //             setThiRefresh(false);
  //         },
  //         enabled: refresh,
  //     }
  // );

  const getProduct = useQuery(
    ['getProduct'],
    async () => {
      const reponse = await axios.get(`http://localhost:8080/products/${productId}/details`);
      return reponse;
    },
    {
      onSuccess: (response) => {
        setProduct(response.data);
        // console.log(response.data);
        setThiRefresh(false);
      },
      enabled: refresh,
    }
  );
  const getSameNameProducts = useQuery(
    ['getSameNameProducts'],
    async () => {
      const response = await axios.get(`http://localhost:8080/products/${productId}/sameName`);
      return response;
    },
    {
      enabled: !!productId,
      onSuccess: (response) => {
        setSameNameProducts(response.data);
      },
    }
  );

  const addCartSubmitHandle = async () => {
    setThiRefresh(true);
    try {
      const response = await axios.post(
        'http://localhost:8080/cart/addition',
        JSON.stringify(searchParams),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      //   alert('상품을 장바구니에 등록 성공');
      console.log(response);
      return response;
    } catch (error) {
      if (error.response.status === 401) {
        alert('로그인후 이용해주세요');
      }
    }
  };

  const getReviews = useQuery(
    ['getReviews'],
    async () => {
      const response = await axios.get(`http://localhost:8080/products/review/${productId}`);
      return response;
    },
    {
      onSuccess: (response) => {
        setReviews([...response.data]);
        const IdList = [];
        response.data.forEach((review) => {
          IdList.push(review.reviewId);
        });
        const result1 = [...new Set(IdList)];
        setreviewIdList(result1);
      },
      enabled: refresh && !!getProduct,
    }
  );
  const getAdminReview = useQuery(
    ['getAdminReview'],
    async () => {
      const option = {
        headers: {
          Authorization: `${localStorage.getItem('accessToken')}`,
        },
        params: {
          reviewsIdList,
        },

        paramsSerializer: (params) => QueryString.stringify(params, { arrayFormat: 'repeat' }),
      };
      const response = await axios.get('http://localhost:8080/products/adminReview', option);
      return response;
    },
    {
      enabled: !!getReviews && reviewsIdList.length > 0,
      onSuccess: (response) => {
        setThisAdminReviews(response.data);
      },
    }
  );
  if (!product) {
    return setThiRefresh(true);
  }

  const sizeClick = (e) => {
    setSearchparams({ ...searchParams, sizeName: e.target.textContent });
    setSelectSize(true);
  };
  const shippingClickHandle = () => {
    if (shippingIsOpen) {
      setShippingIsOpen(false);
    } else {
      setShippingIsOpen(true);
    }
  };

  const selectColor = (product) => {
    navigate(`/auth/products/${product.productId}/details`);
    setThiRefresh(true);
    setSearchparams({ ...searchParams, productId: product.productId });
  };

  const directBuy = async (product) => {
    const response = axios.post(
      'http://localhost:8080/products/directBuy',
      JSON.stringify(searchParams),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken'),
        },
      }
    );
    setThiRefresh(true);
    navigate(`/products/payment`);
  };
  return (
    <>
      <CommonHeader />
      <div css={container}>
        <div css={imgContainer}>
          <img css={img} src={product.productImg} alt="productImg" />
          {getReviews.data !== undefined
            ? reviews.map((review) => <ReviewComponent review={review} />)
            : '리뷰가 없습니다.'}
        </div>
        <div css={detailsContainer}>
          <div css={sameNameProductsContainer}>
            {sameNameProducts.map((product) => {
              return (
                <>
                  <img
                    css={sameNameProductsImg}
                    src={product.productImg}
                    alt=""
                    onClick={() => selectColor(product)}
                  ></img>
                </>
              );
            })}
          </div>
          <div css={detailTop}>
            <h1 css={productName}>{product.productName}</h1>
            <div css={productPrice}>₩{product.productPrice}</div>
          </div>
          <div css={sizeContainer}>
            {/* 카테고리아이디 별로 사이즈 출력 */}
            {product.sizeS !== null && product.sizeS !== '' ? (
              <div css={productSize} onClick={sizeClick}>
                {product.sizeS}
              </div>
            ) : (
              ''
            )}
            {product.sizeM !== null && product.sizeM !== '' ? (
              <div css={productSize} onClick={sizeClick}>
                {product.sizeM}
              </div>
            ) : (
              ''
            )}
            {product.sizeL !== null && product.sizeL !== '' ? (
              <div css={productSize} onClick={sizeClick}>
                {product.sizeL}
              </div>
            ) : (
              ''
            )}
            {product.sizeXL !== null && product.sizeXL !== '' ? (
              <div css={productSize} onClick={sizeClick}>
                {product.sizeXL}
              </div>
            ) : (
              ''
            )}
            {product.sizeXXL !== null && product.sizeXXL !== '' ? (
              <div css={productSize} onClick={sizeClick}>
                {product.sizeXXL}
              </div>
            ) : (
              ''
            )}
            <div css={selectSizeContainer}>선택사이즈 {searchParams.sizeName}</div>
          </div>

          <div css={detailBottom}>
            <div css={delivery}>10만원 이상 결제시 무료배송</div>
          </div>
          <div css={shippingContainer}>
            <div onClick={shippingClickHandle} css={shippingText}>
              택배회사{' '}
            </div>
            {shippingIsOpen ? (
              <>
                <div css={shippingSubText}>&#62;ㅁㅁ택배 (1234-5678) </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>
        <div css={buttonList}>
          {selectSize ? (
            <button css={addCartText} onClick={addCartSubmitHandle}>
              장바구니에 담기
            </button>
          ) : (
            <button css={cartText}>사이즈선택</button>
          )}
          {selectSize ? (
            <button css={directBuyText} onClick={() => directBuy(product)}>
              바로구매
            </button>
          ) : (
            <button css={cartText}>사이즈선택</button>
          )}
        </div>
      </div>
      <CommonFooter />
    </>
  );
};

export default ProductDetails;
