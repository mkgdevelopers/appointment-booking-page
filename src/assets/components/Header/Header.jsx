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
            <li><a href='/'> Home</a></li>
            <li><a href='/services '> Services</a></li>
            <li><a href='/blogs'> Blogs</a></li>
            <li><a href='/account'> Account</a></li>
        </ul>
      </div>
      <p></p>
    </div>
  )
}

export default Header
