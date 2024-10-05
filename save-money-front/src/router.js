import MainPage from './mainpage/mainPage'
import LoginPage from './login/loginPage'
import {BrowserRouter, Routes, Route} from "react-router-dom";

const BasicRoute = () => {
  return (
   
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mainPage" element={<MainPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
  )
}

export default BasicRoute