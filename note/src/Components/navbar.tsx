import type { JSX } from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";
import { useAuth } from "../context/UseAuth";
import api from "../ts/api";

function Navbar(): JSX.Element {
    const { isAuthorized, verifyAuth } = useAuth();

    return (
        <div className="navigation_bar">
            <Link to="/" className="navbar_element">
                Home
            </Link>
            <Link to="/journal" className="navbar_element">
                Journal
            </Link>
            {!isAuthorized ? (
                <div className="sign_container">
                    <Link to="/sign-in" className="navbar_element">
                        Sign In
                    </Link>
                    <Link to="/sign-up" className="navbar_element">
                        Sign Up
                    </Link>
                </div>
            ) : (
                <button
                    className="navbar_element"
                    onClick={async () => {
                        await api.get("api/Auth/logout/");
                        verifyAuth();
                    }}
                >
                    Log out
                </button>
            )}
        </div>
    );
}

export default Navbar;
