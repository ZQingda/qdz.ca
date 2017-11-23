import React, { Component } from 'react';
import request from 'superagent';
import { Switch, Route, Link } from 'react-router-dom';

import config from '../config';
var domain = config.DOMAIN;

class AlbumList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albums: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setState = this.setState.bind(this);

    }

    componentDidMount() {
        var endpoint = domain + 'album/list';
        request.get(endpoint)
            .end((err, res) => {
                if (err) { console.log('HANDLE ERROR: ' + err); }
                //console.log(res.body[0]);
                this.setState({ albums: res.body });
                //console.log(this.state.albums);
                return res;
            });


    }

    render() {
        var albumNav = this.state.albums.map((album) =>
            <li key={album._id}><Link to={{
                pathname: `/albums/${album.name}`,
                state: {albumid: album._id}
            }}>{album.name}</Link></li>
        );
        return (
            <div className='ABCD'>
                <ul>
                    <li><Link to={{pathname : `/albums/all`, state: {albumid: 'all'}}}>All images</Link></li>
                    {albumNav}
                </ul>
            </div>
        );
    }
}

export default AlbumList;