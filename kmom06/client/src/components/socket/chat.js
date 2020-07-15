/*eslint max-len: ["error", { "code": 200 }]*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import base from '../../config/api.js';
import io from 'socket.io-client';

const socket = io(base.chat());

class Chat extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.updateConversation = this.updateConversation.bind(this);
        this.saveConversation = this.saveConversation.bind(this);
        this.adminConversations = this.adminConversations.bind(this);
        this.newMessage = this.newMessage.bind(this);
        this.state = {
            conversation: [],
            conversationData: "",
            savedConversations: [],
            users: "",
            username: ""
        };
    }

    componentDidMount() {
        this.startChat();
        socket.emit('resume conversation');
        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                profile = [];

            profile = JSON.parse(user);
            this.setState({
                username: profile.name
            }, () => socket.emit('user joined', profile.name), socket.emit('get conversations'));
        } else {
            this.props.history.push('/login');
        }
    }

    startChat() {
        let that = this;

        socket.on('connect', function() {
            console.info("Connected to chat");
        });

        socket.on('disconnect', function() {
            console.info("Disconnected from chat");
        });

        socket.on('current users', function (users) {
            let currentUsers = [],
                currentConversation = that.state.conversation;

            users.all.map(function (user) {
                currentUsers.push(<li key={user}>{user}</li>);
                return true;
            });

            if (users.new) {
                currentConversation.push(
                    <div className="chat-container message" key={users.new}>
                        <p className="newUser center">{ users.new } has connected.</p>
                    </div>
                );
            } else if (users.left) {
                currentConversation.push(
                    <div className="chat-container message" key={users.left}>
                        <p className="oldUser center">{ users.left } has disconnected.</p>
                    </div>
                );
            }

            that.setState({
                users: currentUsers,
                conversation: currentConversation
            });
        });

        socket.on('new message', function (conversation) {
            that.updateConversation(conversation);
        });

        socket.on('current conversation', function (conversation) {
            that.updateConversation(conversation);
        });

        socket.on('new conversation', function (conversation) {
            that.setState({
                conversation: conversation
            });
        });

        socket.on('show conversations', function (savedConversations) {
            let saved = [];

            savedConversations.map(function (conversation) {
                let time = conversation.timestamp;

                saved.push(<option key={time} value={time}>{time}</option>);
                return true;
            });
            that.setState({
                savedConversations: saved
            });
        });
    }

    newMessage(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            socket.emit('chat message', {
                user: this.state.username,
                text: e.target.value
            });
            e.target.value = "";
            this.setState({
                last: e.target.value
            });
        }
    }

    updateConversation(conversation) {
        let that = this,
            currentConversation = [];

        conversation.map(function (message) {
            let key = "message-" + message.count,
                containerClass = that.state.username === message.user ? "chat-container me-container" : "chat-container",
                userClass = that.state.username === message.user ? "user me-user" : "user";

            currentConversation.push(
                <div className={containerClass} key={key}>
                    <p className={userClass}>{ message.user }</p>
                    <p className="message">{ message.text }</p>
                    <span className="time-left">{ message.timestamp }</span>
                </div>
            );
            return true;
        });
        this.setState({
            conversation: currentConversation,
            conversationData: conversation
        });
    }

    clearConversation() {
        socket.emit('clear conversation');
    }

    saveConversation() {
        let currentConversation = this.state.conversation;

        socket.emit('save conversation', this.state.username);
        currentConversation.push(
            <div className="chat-container message saved" key={"saved"}>
                <p className="center">Chat saved!</p>
            </div>
        );
    }

    adminConversations(e) {
        const data = new FormData(e.target);

        if (this.state.action === "restore") {
            socket.emit('restore conversation', data.get('timestamp'));
        } else if (this.state.action === "delete") {
            socket.emit('delete conversation', data.get('timestamp'));
        }
    }

    render() {
        return (
            <article>
                <h1>Chat</h1>
                <form className="chat-admin" onSubmit={this.adminConversations}>
                    <select name="timestamp" required>
                        <option disabled selected value="">Choose restore point</option>
                        { this.state.savedConversations }
                    </select>
                    <div className="admin-buttons">
                        <button className="button restore" type="submit" onClick={() => this.setState({action: "restore"})}>Restore chat</button>
                        <button className="button delete" type="submit" onClick={() => this.setState({action: "delete"})}>Delete chat</button>
                    </div>
                </form>
                <h4 className="users">Connected users:</h4>
                <ol>
                    { this.state.users }
                </ol>
                <div id="conversation" className="conversation">{ this.state.conversation }</div>
                <textarea
                    id="new-message"
                    className="new-message"
                    name="message"
                    onKeyDown={ this.newMessage }
                    placeholder="Start chatting, press enter send message."
                />
                <div className="chat-buttons">
                    <button className="button save" onClick={this.saveConversation}>Save chat</button>
                    <button className="button clear" onClick={() => {if (window.confirm('Clear the chat?')) {this.clearConversation();}}}>Clear chat</button>
                </div>
            </article>
        );
    }
}

export default Chat;
