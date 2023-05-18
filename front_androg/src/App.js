import logo from "./logo.svg";
import "./App.css";
import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import CommonHeader from "./components/CommonHeader/CommonHeader";
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
import AuthRouteReactQuery from "./components/Route/AuthRoute/AuthRouteReactQuery";
import Payment from "./pages/Payment/Payment";
import Review from "./pages/Review/Review";
import AdminPage from "./pages/Admin/AdminPage";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        {/* 메인 및 로그인 회원가입 페이지 */}
        <Route exact path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 문의페이지 Route */}
        <Route path="/page/notice" element={<Notice />} />
        <Route path="/page/customer" element={<CustomerSupport />} />
        <Route path="/page/shipping" element={<Shipping />} />
        <Route path="/page/sizeguide" element={<SizeGuide />} />
        <Route path="/page/legal" element={<Legal />} />

        {/* 마이페이지 Route */}
        <Route
          path="/mypage"
          element={<AuthRouteReactQuery path="/mypage" element={<MyPage />} />}
        />
        <Route path="/mypage/address" element={<Address />}></Route>

        {/* 상품페이지 */}
        <Route path="/category/:categoryId" element={<Products />} />
        <Route path="products/:productId/details" element={<ProductDetails />}></Route>
        <Route path="/products/search" element={<SearchProducts />}></Route>
        <Route path="/products/payment" element={<Payment />} />

        {/* 리뷰 페이지 */}
        <Route path="/product/:productId/review" element={<Review />} />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;
