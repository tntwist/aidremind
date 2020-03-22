import React from "react";
import logo from "../assets/aidremind_logo_positive.png"

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <img src={logo} alt="aidreminder" id="logo" />
            </div>
        );
    }
}

export default Header;