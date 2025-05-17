import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();



  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h1 className="admin-dashboard-title">Admin Dashboard</h1>
        <p className="admin-dashboard-welcome">Welcome back, admin 👋</p>

        <div className="admin-dashboard-info">
          <p className="admin-dashboard-subtitle">Here's what you can do:</p>
          <ul className="admin-dashboard-actions">
            <li>➤ See and delete appointments</li>
            <li>➤ Create new blog posts</li>
            <li>➤ Edit or delete existing blogs</li>
            <li>➤ Manage all content</li>
          </ul>


        </div>
      </div>
    </div>
  );
};

export default Dashboard;
