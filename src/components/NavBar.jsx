import React from 'react';
import "./NavBar.css";
import axios from 'axios'
import { Link } from 'react-router-dom';
import Contact from './Contact';
import About from './About';
import Home from './Home';

export default (props) => {

    return (
        <header>
            <h1>To do List</h1>
            <nav>
                <ul>
                    <Link className="link" to="/">
                        <li> Home </li>
                    </Link>
                    <Link className="link" to="/about">
                        <li> About </li>
                    </Link>
                    <Link className="link" to="/contact">
                        <li> Contact Us </li>
                    </Link>

                </ul>
            </nav>
        </header>

    )
}

