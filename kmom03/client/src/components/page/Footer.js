import React, { Component } from 'react';
import meSmallImage from '../../assets/img/Paul-Moreland.jpg';

class Footer extends Component {
    render() {
        return (
            <footer id="site-footer">
                <div className="me-tag">
                    <img src={meSmallImage} alt="Paul Moreland" />
                    <p>Paul Moreland är student hos Blekinge Tekniska Högskola och studerar Webbprogrammering</p>
                </div>
            </footer>
        );
    }
}

export default Footer;
