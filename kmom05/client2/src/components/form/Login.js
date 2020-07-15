/*eslint max-len: ["error", { "code": 170 }]*/

import React, { Component } from 'react';
import base from '../../config/api.js';
let api = base.api();

class Login extends Component {
    constructor(props) {
        super(props);
        this.registerSubmit = this.registerSubmit.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.state = {
            showing: false,
            hidden: true,
            button: true,
            invalid: false
        };
    }
    registerSubmit(event) {
        let that = this;

        event.preventDefault();
        const data = new FormData(event.target);

        let person = {
            "name": data.get('name'),
            "password": data.get('password')
        };

        fetch(api + "/login", {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(function (res) {
                if (res.data.result) {
                    localStorage.setItem("activeUser", JSON.stringify(res.data.user));
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    that.props.history.push('/profile');
                    window.location.reload(false);
                } else {
                    that.setState({
                        invalid: <p className="center invalid">{res.data.user}</p>
                    });
                }
            });
    }
    toggleShowPassword() {
        this.setState({
            hidden: !this.state.hidden,
            button: !this.state.button
        });
    }
    render() {
        let user = localStorage.getItem("activeUser");

        if (user === null) {
            return (
                <div className="form-wrapper">
                    <h1>Login</h1>
                    <p className="center">To be able to access the chat and edit reports you must first login.</p>
                    <form action="/profile" className="form-register" onSubmit={this.registerSubmit}>
                        <label className="form-label">Name
                            <input className="form-input" type="text" name="name" required placeholder="Your name" />
                        </label>

                        <label className="form-label">Password
                            <input
                                className="form-input password"
                                type={this.state.hidden ? "password" : "text"}
                                name="password"
                                placeholder="Your password"
                                required
                            />
                            <p><input type="checkbox" className="show-password" onClick={this.toggleShowPassword} /> {this.state.button ? "Show" : "Hide"} password</p>
                        </label>
                        <input className="button form-button center" type="submit" name="login" value="Login" />
                    </form>
                    {this.state.invalid}
                </div>
            );
        } else {
            return (
                <div className="form-wrapper">
                    <h1>Already logged in</h1>
                </div>
            );
        }
    }
}

export default Login;
