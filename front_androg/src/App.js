import { Global } from '@emotion/react';
import { Reset } from './styles/Global/reset';
import { Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import Main from './pages/Main/Main';





function App() {
  return (
    <>
      <Global styles={ Reset }></Global>
      <Routes>
        <Route exact path='/' element={<Main />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </>
  );
}

export default App;
