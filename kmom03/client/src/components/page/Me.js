import React, { Component } from 'react';
import meImage from '../../assets/img/Paul-Moreland-2.jpg';
import meBackdrop from '../../assets/img/Manchester.jpg';
import base from '../../config/api.js';
let api = base.api();


class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
            para1: "",
            para2: "",
            para3: "",
        };
    }

    componentDidMount() {
        fetch(api)
        .then(res => res.json())
        .then(res => this.showContent(res))
    };

    showContent(res) {
        console.log(res);
        let data = res.data.me[0];
        this.setState({
            para1: data.para1,
            para2: data.para2,
            para3: data.para3
        });
    }

    render() {
        return (
            <article>
                <h1>Om Mig Själv</h1>

                <img src={meImage} className="me" alt="Bild på Paul Moreland" />

                <p>{ this.state.para1 }</p>
                <p>{ this.state.para2 }</p>
                <p>{ this.state.para3 }</p>

                <div className="backdrop"><img src={meBackdrop} className="Manchester" alt="Manchester" />St Peter's Square, Manchester</div>
            </article>
        );
    }
}

export default Me;
