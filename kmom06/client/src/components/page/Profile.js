/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../../config/api.js';
import io from 'socket.io-client';

const socket = io(base.chat());

class Profile extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.logoff = this.logoff.bind(this);
        this.state = {
            user: "",
            username: ""
        };
    }
    componentDidMount() {
        this.getProfile();
    }
    logoff() {
        localStorage.clear();
        socket.emit('user left', this.state.username);
        this.setState({
            user: ""
        });
        this.props.history.push('/login');
        window.location.reload(false);
    }
    getProfile() {
        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                profile = [];

            profile = JSON.parse(user);
            this.setState({
                user: [
                    <div key="profile">
                        <h3 className="center">Username: {profile.name}</h3>
                        <h4 className="center">Birthday: {profile.birthday}</h4>
                        <h4 className="center">Country: {profile.country}</h4>
                        <h4 className="center">Email: {profile.email}</h4>
                        <p>
                            <button name="logoff" className="button center" onClick={this.logoff}>Logoff</button>
                        </p>
                    </div>
                ],
                username: profile.name
            });
        } else {
            this.setState({
                user: [
                    <h3 key="registerfirst" className="center">Your profile will be shown below when you register</h3>
                ]
            });
        }
    }

    render() {
        return (
            <article>
                <h1>Profile page</h1>
                { this.state.user }
            </article>
        );
    }
}

export default Profile;
