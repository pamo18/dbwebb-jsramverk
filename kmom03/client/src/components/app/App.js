import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../page/Header.js';
import Me from '../page/Me.js';
import Report from '../page/Report.js';
import Register from '../form/Register.js';
import Login from '../form/Login.js';
import Profile from '../page/Profile.js';
import Footer from '../page/Footer.js';
import Create from '../page/admin/Create.js';
import Edit from '../page/admin/Edit.js';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUser: ""
        }
    }
    componentDidMount() {
        this.checkLogin()
    }
    checkLogin() {
        if (localStorage.getItem("activeUser") === null) {
            console.log("Not logged in");
        } else {
            console.log("Logged in");
            this.setState({
                activeUser: [
                    <div>
                        <Route exact path="/reports/create" component={Create} />
                        <Route exact path="/reports/edit" component={Edit} />
                        <Route exact path="/reports/edit/:id" component={Edit} />
                    </div>
                ]
            })
        }
    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Header />
                    <div className="wrap-main">
                      <main>
                          <Route exact path="/" component={Me} />
                          <Route path="/reports/week/:kmom" component={Report} />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/register" component={Register} />
                          <Route exact path="/profile" component={Profile} />
                          { this.state.activeUser }
                      </main>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;
