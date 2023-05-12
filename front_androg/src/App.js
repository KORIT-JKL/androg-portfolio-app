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
import Address from "./pages/Address/Address";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* 문의페이지 Route */}
        <Route exact path="/page/notice" element={<Notice />}></Route>
        <Route exact path="/page/customer" element={<CustomerSupport />}></Route>
        <Route exact path="/page/shipping" element={<Shipping />}></Route>
        <Route exact path="/page/sizeguide" element={<SizeGuide />}></Route>
        <Route exact path="/page/legal" element={<Legal />}></Route>

        {/* 마이페이지 Route */}
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mypage/address" element={<Address />}></Route>

        <Route path="/category/:categoryId" element={<Products />}></Route>
        <Route path="products/:productId/details" element={<ProductDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
