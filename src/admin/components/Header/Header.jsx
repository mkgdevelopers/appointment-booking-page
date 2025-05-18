import React from "react";
import { useNavigate } from "react-router-dom";
import './Header.css'
import { useParams } from "react-router-dom";

const Navbar = () => {

  {}
const navigate = useNavigate()
const handleLogout = () => {
  localStorage.removeItem('adminLoggedIn');
  navigate('/login');
};

  return (
    <div className="admin-navbar">
      <span className="admin-brand">Admin Panel</span>
      <span className="admin-user">Logged in as: Admin</span>
      <button onClick={()=>{handleLogout()}}>Log Out</button>
    </div>
  );
};

export default Navbar;
