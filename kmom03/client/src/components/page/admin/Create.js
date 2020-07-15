import React, { Component } from 'react';
import base from '../../../config/api.js';
let api = base.api();

class Create extends Component {
    constructor(props) {
        super(props);
        this.registerSubmit = this.registerSubmit.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.state = {
            options: ""
        };
    }
    componentDidMount() {
        this.getOptions();
    }
    registerSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        let token = localStorage.getItem("token");
        token = JSON.parse(token);
        let report = {
            "title": data.get('title'),
            "content": data.get('content')
        }
        console.log(report);
        fetch(api + "/reports", {
            method: 'POST',
            body: JSON.stringify(report),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        }).then(this.props.history.push('/reports/week/1'));
    }
    getOptions() {
        const that = this;
        let reports = [1, 2, 3, 4, 5, 6, 10];
        let options = [];
        let count = 0;
        reports.forEach(function (report) {
            fetch(api + `/reports/week/${report}`)
            .then(res => res.json())
            .then(function(res) {
                if (res.data.report.title === "Report comming soon") {
                    if (report >= 10) {
                        options[report] = <option>Kmom{report}</option>
                    } else {
                        options[report] = <option>Kmom0{report}</option>
                    }
                }
                if (count < reports.length) {
                    that.setState({
                        options: options
                    })
                }
                count ++
            })
        })
    }
    render() {
        return (
            <div className="form-wrapper">
                <h1>Create Report</h1>
                <form action="/reports/week/1" method="post" className="form-register" onSubmit={this.registerSubmit}>
                        <label className="form-label">Title
                            <select className="form-input" name="title" required>
                                { this.state.options }
                            </select>
                        </label>

                        <label className="form-label">Content
                            <textarea className="form-input textarea" type="text" name="content" required placeholder="Write your report here!"></textarea>
                        </label>

                        <label className="form-label check-label">
                            <input className="check-input" type="checkbox" name="finished" required />
                            Are you finished?
                        </label><br />

                        <input className="button form-button center" type="submit" name="create" value="Create" />
                </form>
            </div>
        );
    }
}

export default Create;
