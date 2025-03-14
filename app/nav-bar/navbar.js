import React from 'react';
import './navbar.css';
import Link from 'next/link';

const Navbar = () => {
    return (
        
        <nav className="navbar">
            <div className="navbar-left">
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li>About</li>
                    <li><Link href="/projects">Projects</Link></li>
                    <li>Contact</li>
                </ul>
            </div>
            
            <div className="navbar-right">
                <a href="https://www.linkedin.com/in/dexterbalino/" className="linkedin-icon">
                    <img src="/linkedin.png" alt="LinkedIn" />
                </a>
                <a href="https://github.com/ElysianCode12" className="github-icon">
                    <img src="/github.png" alt="GitHub" />
                </a>
            </div>
        </nav>
    )
}

export default Navbar;
