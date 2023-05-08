import logo from "./logo.svg";
import "./App.css";
import { Global } from "@emotion/react";
import { Reset } from "./styles/Global/reset";
import { Route, Routes } from "react-router-dom";
import CommonHeader from "./components/commonHeader/CommonHeader";
import Notice from "./pages/Support/Notice/Notice";

function App() {
  return (
    <>
      <Global styles={Reset}></Global>
      <Routes>
        <Route exact path="/" element={<CommonHeader />}></Route>
        <Route exact path="/page/notice" element={<Notice />}></Route>
      </Routes>
    </>
  );
}

export default App;
