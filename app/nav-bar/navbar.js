import React from 'react';
import Image from 'next/image';
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
                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                </a>
                <a href="https://github.com/ElysianCode12" className="github-icon">
                    <Image src="/github.png" alt="GitHub" width={24} height={24} />
                </a>
            </div>
        </nav>
    )
}

export default Navbar;
