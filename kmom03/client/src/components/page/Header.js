import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.jpg';
import base from '../../config/api.js';
let api = base.api();

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            course: "",
            activeUser: ""
        };
    }
    componentDidMount() {
        this.checkLogin();
        fetch(api)
        .then(res => res.json())
        .then(res => this.showContent(res))
    }

    showContent(res) {
        console.log(res);
        let data = res.data.me[0];
        this.setState({
            name: data.name,
            course: data.course
        });
    }

    checkLogin() {
        if (localStorage.getItem("activeUser") === null) {
            console.log("Normal menu");
        } else {
            console.log("Admin menu");
            this.setState({
                activeUser: [
                    <nav className="navbar_main admin-nav">
                        <ul>
                            <li><NavLink to="/reports/create" activeClassName="selected">Create</NavLink ></li>
                            <li><NavLink to="/reports/edit" activeClassName="selected">Edit</NavLink ></li>
                        </ul>
                    </nav>
                ]
            })
        }
    }

    render() {
        const checkActive = (match, location) => {
            if(!location) return false;
                const {pathname} = location;
            return pathname === "/";
        }

        const checkActiveReport = (match, location) => {
            if(!location) return false;
                const {pathname} = location;
                var splitLink = pathname.split("/")[1];
            return splitLink === "reports";
        }
        return (
            <header className="site-header">
                <img src={logo} className="logo" alt="logo" />
                <span className="site-title">{ this.state.course } Me-Sida för { this.state.name }</span>
                <nav className="navbar_main">
                    <ul>
                        <li><NavLink to="/" activeClassName="selected" isActive={checkActive}>Me</NavLink ></li>
                        <li><NavLink to={{pathname: "/reports/week/1", state: { kmom: "1" }}} activeClassName="selected" isActive={checkActiveReport}>Redovisning</NavLink></li>
                        <li><NavLink to="/register" activeClassName="selected">Register</NavLink ></li>
                        <li><NavLink to="/login" activeClassName="selected">Login</NavLink ></li>
                        <li><NavLink to="/profile" activeClassName="selected">Profile</NavLink ></li>
                    </ul>
                </nav>
                { this.state.activeUser }
            </header>
        );
    }
}

export default Header;
