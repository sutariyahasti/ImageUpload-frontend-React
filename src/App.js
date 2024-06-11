import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Data from "./componant/data";
import Login from "./componant/login";
import Signup from "./componant/signup";
import Signupextra from "./componant/signupextra";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/User" exact element={<Signupextra />} />
          <Route path="/" element={<Signup />} />
          <Route path="/data" element={<Data />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
