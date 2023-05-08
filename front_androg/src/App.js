import logo from './logo.svg';
import './App.css';
import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';
import CommonHeader from './pages/products/commonHeader';
import CommonFooter from './pages/products/commonFooter';


function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>
        <Route exact path='/' element={<CommonHeader />}></Route>
      </Routes>
    </>
  );
}

export default App;
