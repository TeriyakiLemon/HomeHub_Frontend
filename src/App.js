import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Webpage/Login_page';
import RegisterPage from './Webpage/Register_page';
import MainPage from './Webpage/Main_page';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path='Register' element={<RegisterPage/>}/>
        <Route path='MainPage' element={<MainPage/>}/>

      </Routes>
    </Router>
  );
}


export default App;
