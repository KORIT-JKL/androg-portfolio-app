import "./App.css";
import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import Notice from "./pages/Support/Notice/Notice";
import CustomerSupport from "./pages/Support/CustomerSupport/CustomerSupport";
import Shipping from "./pages/Support/Shipping/Shipping";
import SizeGuide from "./pages/Support/SizeGuide/SizeGuide";
import Legal from "./pages/Support/Legal/Legal";
import Login from "./pages/Login/Login";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import MyPage from "./pages/MyPage/MyPage";
import Products from "./pages/products/products";
import ProductDetails from "./pages/products/productDetails";
import SearchProducts from "./pages/products/searchProducts";
import Address from "./pages/Address/Address";
import Payment from "./pages/Payment/Payment";
import Review from "./pages/Review/Review";
import AdminPage from "./pages/Admin/AdminPage";
import AuthRoute from "./components/Route/AuthRoute/AuthRoute";

import InquiryResponse from "./pages/Support/CustomerSupport/InquiryResponse";
import OAuth2Register from "./pages/Register/OAuth2Register";
import OAuth2Login from "./pages/Login/OAuth2Login";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        {/* 메인 및 로그인 회원가입 페이지 */}
        <Route exact path="/" element={<AuthRoute path="/" element={<Main />} />} />
        <Route path="/auth/login" element={<AuthRoute path="/auth/login" element={<Login />} />} />
        <Route
          path="/auth/oauth2/login"
          element={<AuthRoute path={"/auth/oauth2/login"} element={<OAuth2Login />} />}
        />
        <Route path="/auth/register" element={<Register />} />
        <Route
          path="/auth/oauth2/register"
          element={<AuthRoute path="/auth/oauth2/register" element={<OAuth2Register />} />}
        />

        {/* 문의페이지 Route */}
        <Route path="/page/notice" element={<Notice />} />
        <Route path="/page/customer" element={<CustomerSupport />} />
        <Route path="/page/customer/inquiry" element={<InquiryResponse />} />
        <Route path="/page/shipping" element={<Shipping />} />
        <Route path="/page/sizeguide" element={<SizeGuide />} />
        <Route path="/page/legal" element={<Legal />} />

        {/* 마이페이지 Route */}
        <Route
          path="/user/mypage"
          element={<AuthRoute path={"/user/mypage"} element={<MyPage />} />}
        />
        <Route
          path="/user/mypage/address"
          element={<AuthRoute path={"/user/mypage/address"} element={<Address />} />}
        ></Route>

        {/* 상품페이지 */}
        <Route path="/category/:categoryId" element={<Products />} />
        <Route path="products/:productId/details" element={<ProductDetails />}></Route>
        <Route path="/products/search" element={<SearchProducts />}></Route>
        <Route path="/products/payment" element={<Payment />} />

        {/* 리뷰 페이지 */}
        <Route path="/product/:orderDetailId/review" element={<Review />} />

        {/* 관리자페이지 */}
        <Route path="/admin" element={<AuthRoute path={"/admin"} element={<AdminPage />} />} />
        {/* 상품 등록, 수정, 품절 */}
        <Route
          path="/admin/product/register"
          element={<AuthRoute path={"/admin/product/register"} element={<AdminPage />} />}
        />
        {/* 수정 카테고리별 params 사용 */}
        <Route
          path="/admin/product/modify/:categoryId"
          element={<AuthRoute path={"/admin/product/modify/:categoryId"} element={<AdminPage />} />}
        />
        <Route
          path="/admin/product/soldout"
          element={<AuthRoute path={"/admin/product/soldout"} element={<AdminPage />} />}
        />
        {/* 리뷰 등록, 제거 , 리뷰 */}
        <Route
          path="/admin/review/register"
          element={<AuthRoute path={"/admin/review/register"} element={<AdminPage />} />}
        />
        <Route
          path="/admin/review/delete"
          element={<AuthRoute path={"/admin/review/delete"} element={<AdminPage />} />}
        />
        <Route
          path="/admin/review/review"
          element={<AuthRoute path={"/admin/review/review"} element={<AdminPage />} />}
        />
        {/* 공지등록, 팝업 등록 */}
        <Route
          path="/admin/notice/register"
          element={<AuthRoute path={"/admin/notice/register"} element={<AdminPage />} />}
        />
        <Route
          path="/admin/popUp/register"
          element={<AuthRoute path={"/admin/popUp/register"} element={<AdminPage />} />}
        />
        {/* 문의 접수, 문의 답변 */}
        <Route
          path="/admin/inquiry"
          element={<AuthRoute path={"/admin/inquiry"} element={<AdminPage />} />}
        />
      </Routes>
    </>
  );
}

export default App;
