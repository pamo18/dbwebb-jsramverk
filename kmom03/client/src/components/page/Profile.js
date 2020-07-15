import React, { Component } from 'react';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.logoff = this.logoff.bind(this);
        this.state = {
            user: ""
        };
    }
    componentDidMount() {
        this.getProfile();
    }
    logoff() {
        localStorage.clear();
        this.setState({
            user: ""
        });
        this.props.history.push('/login')
        window.location.reload(false);
    }
    getProfile() {
        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser");
            let profile = [];
            profile = JSON.parse(user);
            this.setState({
                user: [
                    <div>
                        <h3 className="center">Name: {profile.name}</h3>
                        <h3 className="center">Birthday: {profile.birthday}</h3>
                        <h3 className="center">Country: {profile.country}</h3>
                        <h3 className="center">Email: {profile.email}</h3>
                        <p><button className="button center" onClick={this.logoff}>Logoff</button></p>
                    </div>
                ]
            })
        } else {
            this.setState({
                user: [
                    <h3 className="center">Your profile will be shown below when you register</h3>
                ]
            })
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
