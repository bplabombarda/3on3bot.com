import React, { Component } from 'react';

require('./Player.scss');

export default class Player extends Component {
    render() {
        let url = `http://md-akc.med.nhl.com/mp4/nhl/2016/02/10/15dc395a-f8b1-401c-af0b-2113156a1090/1455076513168/asset_1200k.mp4`;
        let title = 'Domingue robs Panarin twice'

        return (
            <div className="videoContainer">
                <video controls autoPlay name="media">
                    <source src={ url } type="video/mp4"/>
                </video>
                <h3 className='videoTitle'>{ title }</h3>
            </div>
        );
    }
}
