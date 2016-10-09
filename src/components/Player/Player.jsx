import React, { Component } from 'react';

require('./Player.scss');

export default class Player extends Component {
    render() {
        let source = `${this.props.source}`;
        let title = this.props.title;

        return (
            <div id="iframeContainer">
                <iframe id="videoIframe" src={ source } height="360" width="640" frameBorder="0" scrolling="no" allowFullScreen></iframe>
                <h3 className='videoTitle'>{ title }</h3>
            </div>
        );
    }
}
