/*eslint max-len: ["error", { "code": 150 }]*/

import React, { Component } from 'react';
import PropTypes from "prop-types";
import base from '../../../config/api.js';
let api = base.api();

class Edit extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.updateText = this.updateText.bind(this);
        this.registerSubmit = this.registerSubmit.bind(this);
        this.getReports = this.getReports.bind(this);
        this.showReport = this.showReport.bind(this);
        this.state = {
            current: {
                title: "",
                content: ""
            },
            options: "",
            reports: ""
        };
    }
    componentDidMount() {
        this.getReports();
    }
    updateText(e) {
        this.setState({
            current: {
                title: this.state.current.title,
                content: e.target.value
            },
        });
    }
    registerSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        let report = {
            "title": data.get('title'),
            "content": data.get('content')
        };

        fetch(api + "/reports/edit", {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this.props.history.push('/reports/week/1'));
    }
    getReports() {
        const that = this;

        let all = [1, 2, 3, 4, 5, 6, 10],
            options = [],
            reports = [],
            count = 0;

        all.forEach(function (report) {
            fetch(api + `/reports/week/${report}`)
                .then(res => res.json())
                .then(function(res) {
                    if (res.data.report.title !== "Report comming soon") {
                        let title = res.data.report.title;

                        options[report] = <option value={title}>{title}</option>;
                        reports[report] = {
                            title: title,
                            content: res.data.report.content
                        };
                    }
                    if (all.length === count + 1) {
                        that.setState({
                            options: options,
                            reports: reports
                        });
                    }
                    count ++;
                });
        });
    }
    showReport(e) {
        let current = this.state.reports.filter(function(report) {
            return report.title === e.target.value;
        });

        this.setState({
            current: current[0]
        });
    }
    render() {
        return (
            <div className="form-wrapper">
                <h1>Edit Report</h1>
                <form action="/reports/week/1" method="post" className="form-register" onSubmit={this.registerSubmit}>
                    <label className="form-label">Title
                        <select className="form-input" name="title" onChange={this.showReport} required>
                            <option disabled>Select report</option>
                            {this.state.options}
                        </select>
                    </label>

                    <label className="form-label">Content
                        <textarea
                            className="form-input textarea"
                            type="text" name="content"
                            onChange={this.updateText}
                            value={this.state.current.content}
                            required
                            placeholder="Select the report to edit">
                        </textarea>
                    </label>

                    <label className="form-label check-label">
                        <input className="check-input" type="checkbox" name="finished" required />
                        Are you finished?
                    </label><br />

                    <input className="button form-button center" type="submit" name="edit" value="Save" />
                </form>
            </div>
        );
    }
}

export default Edit;
