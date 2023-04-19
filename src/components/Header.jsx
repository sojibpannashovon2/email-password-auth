import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div style={{ display: "flex", gap: "60px", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "40px" }}>
            <Link to="/">Home</Link>
            <Link to="/login">LogIn</Link>
            <Link to="/resistor">Resistor</Link>
        </div>
    );
};

export default Header;