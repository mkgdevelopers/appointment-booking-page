import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import './styles/AdminLayout.css'
import { Outlet } from "react-router-dom";

const Adm = () => {
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="mainContent">
        <Header />
        <Outlet/>
      </div>
    </div>
  );
};

export default Adm;
