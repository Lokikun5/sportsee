import React from "react";
import { Link } from "react-router-dom";
import '../styles/homePage.scss';
function HomePage() {
    return (
        <div className="container-home-page">
            <h1>HomePage</h1>
            <Link to="/dashboard/12">
                <button>Dashboard ID 12</button>
            </Link>
            <Link to="/dashboard/18">
                <button>Dashboard ID 18</button>
            </Link>
        </div>
    );
}

export default HomePage;
