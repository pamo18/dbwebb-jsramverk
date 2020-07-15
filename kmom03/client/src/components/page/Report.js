import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown/with-html';
import base from '../../config/api.js';
let api = base.api();

const json = require('../../assets/json/report.json');

class Report extends Component {
    constructor(props) {
        super(props);
        this.getContent = this.getContent.bind(this);
        this.state = {
            reports: json,
            report: "",
            kmom: this.props.match.params.kmom
        };
        this.content = "";
    }

    componentDidMount() {
        this.getContent(this.state.kmom);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            kmom: newProps.match.params.kmom
        }, () => this.getContent(this.state.kmom))
    }

    getContent(kmom) {
        let report = kmom;
        console.log(kmom);
        fetch(api + `/reports/week/${report}`)
        .then(res => res.json())
        .then(res => this.setState({
            report: {
                title: res.data.report.title,
                content: res.data.report.content
            }
        }));
    }

    render() {
        return (
            <main>
                <nav className="navbar_main under">
                    <ul>
                        <li><NavLink to="/reports/week/1" activeClassName="selected">Kmom01</NavLink></li>
                        <li><NavLink to="/reports/week/2" activeClassName="selected">Kmom02</NavLink></li>
                        <li><NavLink to="/reports/week/3" activeClassName="selected">Kmom03</NavLink></li>
                        <li><NavLink to="/reports/week/4" activeClassName="selected">Kmom04</NavLink></li>
                        <li><NavLink to="/reports/week/5" activeClassName="selected">Kmom05</NavLink></li>
                        <li><NavLink to="/reports/week/6" activeClassName="selected">Kmom06</NavLink></li>
                        <li><NavLink to="/reports/week/10" activeClassName="selected">Kmom07-10</NavLink></li>
                    </ul>
                </nav>
                <div>
                    <ReactMarkdown source={ this.state.report.content } escapeHtml={false} />
                </div>
            </main>
        );
    }
  }

  export default Report;
