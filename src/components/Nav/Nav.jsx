import React, { Component } from 'react';

require('./Nav.scss');

export default class Nav extends Component {
    render() {

        return (
            <div className="navContainer">
                <ul className="nav">
                    <li className="navItem">Feb 7</li>
                    <li className="navItem">Feb 8</li>
                    <li className="navItem">Feb 9</li>
                    <li className="navItem">Feb 10</li>
                    <li className="navItem">Feb 11</li>
                </ul>
            </div>
        );

    }
}
