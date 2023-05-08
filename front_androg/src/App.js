import logo from './logo.svg';
import './App.css';
import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import CommonHeader from './components/commonHeader/CommonHeader';

function App() {
  return (

   <>
    <Global styles={Reset} />
    <CommonHeader/>
   </>
  );
}

export default App;
