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
import MyPage from "./pages/MyPage/MyPage";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<CommonHeader />}></Route>

        {/* 문의페이지 Route */}
        <Route exact path="/page/notice" element={<Notice />}></Route>
        <Route exact path="/page/customer" element={<CustomerSupport />}></Route>
        <Route exact path="/page/shipping" element={<Shipping />}></Route>
        <Route exact path="/page/sizeguide" element={<SizeGuide />}></Route>
        <Route exact path="/page/legal" element={<Legal />}></Route>

        <Route exact path="/page/mypage" element={<MyPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
