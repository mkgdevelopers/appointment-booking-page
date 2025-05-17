import React from "react";
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <h2 className="admin-logo">Admin</h2>
      <ul className="admin-nav">
        <li><a href="/appointment-booking-page/admin"> Dashboard </a> </li>
        <li><a href="/appointment-booking-page/admin/all-blogs"> Blogs </a> </li>
        <li><a href="/appointment-booking-page/admin/appointments"> Appointments </a> </li>
      </ul>
    </div>
  );
};

export default Sidebar;
