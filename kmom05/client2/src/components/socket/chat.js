/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import base from '../../config/api.js';
import io from 'socket.io-client';

const socket = io(base.chat());

class Chat extends Component {
    constructor(props) {
        super(props);
        this.updateConversation = this.updateConversation.bind(this);
        this.newMessage = this.newMessage.bind(this);
        this.state = {
            conversation: "",
            users: "",
            username: ""
        };
    }

    componentDidMount() {
        this.startChat();
        socket.emit('restore conversation');
        if (localStorage.getItem("activeUser")) {
            let user = localStorage.getItem("activeUser"),
                profile = [];

            profile = JSON.parse(user);
            this.setState({
                username: profile.name
            }, () => socket.emit('update users', this.state.username));
        } else {
            this.props.history.push('/login')
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

        socket.on('chat message', function (conversation) {
            that.updateConversation(conversation);
        });

        socket.on('restore conversation', function (conversation) {
            that.updateConversation(conversation);
        });

        socket.on('update users', function (users) {
            let currentUsers = [],
                currentConversation = that.state.conversation;

            users.all.map(function (user) {
                currentUsers.push(<li key={user}>{user}</li>)
                return true
            });

            if (users.new) {
                currentConversation.push(
                    <div className="chat-container message" key={users.new}>
                        <p className="newUser center">{ users.new } has joined the conversation.</p>
                    </div>
                );
            } else if (users.left) {
                currentConversation.push(
                    <div className="chat-container message" key={users.left}>
                        <p className="oldUser center">{ users.left } has left the conversation.</p>
                    </div>
                );
            }

            that.setState({
                users: currentUsers,
                conversation: currentConversation
            });
        });
    }

    updateConversation(conversation) {
        let that = this,
            currentConversation = [];

        conversation.map(function (message) {
            let key = "message-" + message.count,
                containerClass = that.state.username == message.user ? "chat-container me-container" : "chat-container",
                userClass = that.state.username == message.user ? "user me-user" : "user";

            currentConversation.push(
                <div className={containerClass} key={key}>
                    <p className={userClass}>{ message.user }</p>
                    <p className="message">{ message.text }</p>
                    <span className="time-left">{ message.timestamp }</span>
                </div>
            )
            return true;
        });
        this.setState({
            conversation: currentConversation
        })
    }

    newMessage(e) {
        if (e.key === 'Enter') {
            e.preventDefault()
            socket.emit('chat message', {
                user: this.state.username,
                text: e.target.value
            });
            e.target.value = "";
            this.setState({
                last: e.target.value
            })
        }
    }

    render() {
        return (
            <div>
                <h4>Connected users:</h4>
                <ol>
                    { this.state.users }
                </ol>
                <div id="conversation" className="conversation">{ this.state.conversation }</div>
                <textarea id="new-message"
                        className="new-message"
                        onKeyDown={ this.newMessage }
                        placeholder="Start chatting"
                />
            </div>
        );
    }
}

export default Chat;
