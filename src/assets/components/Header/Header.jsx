import React from 'react'
import './Header.css'
import logo from '../../vistaonelogo.jpeg'
const Header = () => {
  return (
    <div className='header'>
        <img src={logo} alt="logo" className="logo" />
      <div className="navbar">
        
        <ul>
            <li>Home</li>
            <li>Services</li>
            <li>About</li>
            <li>Account</li>
        </ul>
      </div>
      <p></p>
    </div>
  )
}

export default Header
