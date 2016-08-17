import React, { Component } from 'react';

require('./Player.scss');

export default class Player extends Component {
    render() {
        let url = `https://www.nhl.com/video/embed/${this.props.slug}/c-${this.props.content}?autostart=${this.props.autostart}`;
        return (
            <div className="iframeContainer">
                <iframe src={url} width='540' height='304' frameBorder="0"></iframe>
            </div>
        );
    }
}
