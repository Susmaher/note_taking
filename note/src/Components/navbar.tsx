import type { JSX } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar(): JSX.Element {
    return (
        <div className="navigation_bar">
            <Link to="/" className="navbar_element">
                Home
            </Link>
            <Link to="/journal" className="navbar_element">
                Journal
            </Link>
            <Link to="/sign-in" className="navbar_element">
                Sign In
            </Link>
            <Link to="/sign-up" className="navbar_element">
                Sign Up
            </Link>
        </div>
    );
}

export default Navbar;
