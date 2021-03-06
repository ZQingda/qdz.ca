import React, { Component } from 'react';
import request from 'superagent';
import { Switch, Route, Link } from 'react-router-dom';

import config from '../config';
var domain = config.DOMAIN;

class AlbumCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            albumName: '',
            albumDesc: '',
            tags: ''
        }

        this.postAlbumSubmission = this.postAlbumSubmission.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleTagsChange = this.handleTagsChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({albumName: e.target.value});
    }

    handleDescChange(e) {
        this.setState({albumDesc: e.target.value});
    }

    handleTagsChange(e) {
        this.setState({albumTags: e.target.value});
    }

    postAlbumSubmission(e) {
        //console.log(this.state.albumName);
        //console.log(this.state.albumDesc);

        //console.log('ALBUM SUBMIT');
        e.preventDefault();
        var endpoint = domain + 'album/create';
        request.post(endpoint)
            .send({
                albumName: this.state.albumName,
                albumDesc: this.state.albumDesc,
                albumTags: this.state.albumTags
            })
            .end(function (err, res) {
                if (err) { console.log('HANDLE ERROR: ' + err); }
                return res;
            });

    }

    render() {
        return (
            <div className='albumUpload'>
                <form onSubmit={this.postAlbumSubmission} id='newAlbum'>
                    <label htmlFor='albumName'>Album Name</label>
                    <input type='text' name='albumName' id='albumName' onChange={this.handleNameChange}/>
                    <label htmlFor='albumDesc'>Album Description</label>
                    <input type='text' name='albumDesc' id='albumDesc' onChange={this.handleDescChange}/>
                    <label htmlFor='albumTags'>Album Tags</label>
                    <input type='text' name='albumTags' id='albumTags' onChange={this.handleTagsChange}/>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default AlbumCreate;