import React from 'react';
import './Navbar.css';
import logo from '../../assets/logopngnew.png';
import { Link } from 'react-scroll';

function Navbar() {
  return (
    <nav className='navbar'>
        <img src={logo} alt="Logo" className='logo'/>
        <div className='menu'>
            <Link className='menuItem'>Home</Link>
            <Link className='menuItem'>About</Link>
            <Link className='menuItem'>Scan</Link>
            <Link className='menuItem'>History</Link>
            <Link className='menuItem'>Contact</Link>
            <Link className='menuItem'>Login</Link>
        </div>

    </nav>
  )
}

export default Navbar;