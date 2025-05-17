import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { client } from '../../../sanityClient'; 
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/appointment-booking-page/admin/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const { email, password } = formData;

  if (!email || !password) {
    setError("❌ Email and password are required.");
    return;
  }

  // Simple hardcoded login check (can be replaced later with Sanity/Firebase)
  if (email === 'admin@vista.com' && password === 'vista123') {
    localStorage.setItem('adminLoggedIn', 'true');
    navigate('/appointment-booking-page/admin/');
  } else {
    setError('❌ Invalid email or password');
  }
};

  return (
    <div className="admin-login-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h2 className="admin-login-title">Vista Admin Login</h2>
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="admin-login-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="admin-login-input"
        />
        {error && <p className="admin-login-error">{error}</p>}
        
        <button type="submit" className="admin-login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
