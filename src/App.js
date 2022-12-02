import RegisterPage from "./pages/RegisterPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={ <Dashboard/>} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element ={<LoginPage/>} />
        <Route path="/forgotpassword" element = {<ForgotPassword />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
