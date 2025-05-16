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
            <li><Link to='/'> Home</Link></li>
            <li><Link to='/appointment-booking-page/services '> Services</Link></li>
            <li><Link to='/appointment-booking-page/blogs'> Blogs</Link></li>
            <li><Link to='/appointment-booking-page/account'> Account</Link></li>
        </ul>
      </div>
      <p></p>
    </div>
  )
}

export default Header
