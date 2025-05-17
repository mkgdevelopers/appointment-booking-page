import React from 'react'
import './Header.css'
import logo from '../../vistaonelogo.jpeg'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt="logo" className="logo" />
      <div className="navbar">
        
        <ul>
            <li><a to='/'> Home</a></li>
            <li><a to='/services '> Services</a></li>
            <li><a to='/blogs'> Blogs</a></li>
            <li><a to='/account'> Account</a></li>
        </ul>
      </div>
      <p></p>
    </div>
  )
}

export default Header
