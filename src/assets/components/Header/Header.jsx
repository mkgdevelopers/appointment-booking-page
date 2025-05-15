import React from 'react'
import './Header.css'
import logo from '../../vistaonelogo.jpeg'
const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt="logo" className="logo" />
      <div className="navbar">
        
        <ul>
            <li><a href='#'> Home</a></li>
            <li><a href='#'> Services</a></li>
            <li><a href='#'> About</a></li>
            <li><a href='#'> Account</a></li>
        </ul>
      </div>
      <p></p>
    </div>
  )
}

export default Header
