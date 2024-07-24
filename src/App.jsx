import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
