import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.tsx";
import { ILoginModel, ITokenModel } from "../models/ITokenModel.ts";
import Dashboard from "./pages/Dashboard.tsx";

const defaultLogin: ITokenModel = {
  success: false,
  access_token: "",
  refresh_token: "",
  token_type: "",
};

export const UserContext = createContext({} as ILoginModel);

export function ContentRouter() {
  const [login, setLogin] = useState(() => {
    const savedLogin = localStorage.getItem("userLogin");
    return savedLogin ? JSON.parse(savedLogin) : defaultLogin;
  });

  useEffect(() => {
    localStorage.setItem("userLogin", JSON.stringify(login));
  }, [login]);

  return (
    <UserContext.Provider value={{ login: login, setLogin: setLogin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          {login.success ? (
            <Route path="dashboard" element={<Dashboard />} />
          ) : null}
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default ContentRouter;
