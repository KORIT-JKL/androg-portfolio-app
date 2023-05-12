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
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Register from "./pages/Register/Register";
import MyPage from './pages/MyPage/MyPage';
import Products from "./pages/products/products";
import ProductDetails from "./pages/products/productDetails";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 문의페이지 Route */}
        <Route exact path="/page/notice" element={<Notice />} />
        <Route exact path="/page/customer" element={<CustomerSupport />} />
        <Route exact path="/page/shipping" element={<Shipping />} />
        <Route exact path="/page/sizeguide" element={<SizeGuide />} />
        <Route exact path="/page/legal" element={<Legal />} />

        <Route exact path="/page/mypage" element={<MyPage />} />
        
        <Route path ="/category/:categoryId" element ={<Products/>} />
        <Route path="products/:productId/details" element = {<ProductDetails />}/>
      </Routes>
    </>
  );
}

export default App;
