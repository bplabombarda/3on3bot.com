import React, { Component } from 'react';

require('./Player.scss');

export default class Player extends Component {
    render() {
        return (
            <div id="iframeContainer">
                <iframe id="videoIframe" src={ this.props.highlight } height="360" width="640" frameBorder="0" scrolling="no" allowFullScreen></iframe>
                <h3 className='videoTitle'>{ this.props.title }</h3>
            </div>
        );
    }
}
