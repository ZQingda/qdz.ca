import React, { Component } from 'react';
import request from 'superagent';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Lightbox from './lightbox'
import AlbumMenu from './albumMenu'
import ImageEdit from './imageEdit'

import config from '../config';
var domain = config.DOMAIN;

class AlbumView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            album: {},
            currentImage: '',
            currentIndex: 0,
            lightbox: false,
            delete: false,
            selected: [],
            backToList: false,
            newTags: [],
            albumid: '',
            tagId: ''
        };

        this.getAlbum = this.getAlbum.bind(this);
        this.showImage = this.showImage.bind(this);
        this.hideImage = this.hideImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.toggleDeletion = this.toggleDeletion.bind(this);
        this.handleDeletion = this.handleDeletion.bind(this);
        this.select = this.select.bind(this);
        this.deleteAlbum = this.deleteAlbum.bind(this);
        this.addTags = this.addTags.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.handleNewTagsChange = this.handleNewTagsChange.bind(this);
    }

    getAlbum() {
        if (this.state.albumid) {
            var albumQuery = (this.state.albumid == 'all') ? {} : { albumid: this.state.albumid };
            console.log(albumQuery);
            request.get(domain + 'album/get')
                .query(albumQuery)
                .end((err, res) => {
                    if (err) { console.log('HANDLE ERROR: ' + err); }
                    console.log('ALBUM VIEW RES : ');
                    console.log(res.body);
                    this.setState({
                        images: res.body.album.images ? res.body.album.images : res.body.images,
                        album: res.body.album ? res.body.album : null,
                        tagName: null
                    });
                    console.log('Tried getting');
                });
        }
        else if (this.state.tagId) {
            var tagQuery = {tagId : this.state.tagId};
            var endpoint = domain + 'tag/getall';
            console.log('getall endpoint : ' + endpoint);
            request.get(endpoint)
                .query(tagQuery)
                .end((err, res) => {
                    console.log('ALBUM VIEW RES : ');
                    console.log(res.body);
                    if (err) { console.log('HANDLE TAG ALL ERR : ' + err); }
                    this.setState({
                        images: res.body.images,
                        tagName: res.body.name,
                        album: null
                    })
                });
        }
    }

    showImage(e) {
        //console.log(e.target.childNodes);
        this.setState({
            currentImage: e.target.src,
            currentIndex: parseInt(e.target.dataset.key),
            lightbox: true
        }, /*function() {
            console.log('Passed state: ');
            console.log(this.state)
        }*/);

    }
    hideImage(e) {
        this.setState({
            lightbox: false
        });
    }
    nextImage() {
        var index = this.state.currentIndex;
        var imageCount = this.state.images.length;
        var newIndex = (index == imageCount - 1) ? index : index += 1;
        this.setState({
            currentIndex: newIndex,
            currentImage: this.state.images[newIndex].path.substr(6)
        })
    }
    prevImage() {
        var index = this.state.currentIndex;
        var newIndex = index == 0 ? index : index -= 1;
        this.setState({
            currentIndex: newIndex,
            currentImage: this.state.images[newIndex].path.substr(6)
        })
    }

    toggleDeletion(e) {
        //console.log('Deletion toggled');
        e.preventDefault();
        this.setState({
            delete: true
        }, function () { console.log(this.state) });
    }

    handleDeletion(e) {
        //console.log('Handling Deletion');
        //console.log(this.state);
        e.preventDefault();

        var albumid = this.state.albumid;
        var selected = this.state.selected;

        var deletionPackage = {
            deletionIds: selected
        }
        if (albumid != 'all') {
            deletionPackage.albumid = albumid;
        }

        request.post(domain + 'image/delete')
            .send(deletionPackage)
            .end((err) => {
                if (err) { console.log('DELETE IMAGE ERROR: ' + err); }
            });

        this.setState({
            delete: false,
            selected: []
        });

        this.getAlbum();
    }

    select(e) {
        var newSelected = this.state.selected;
        newSelected.push(this.state.images[e.target.dataset.key]._id);
        this.setState({
            selected: newSelected
        })
    }

    deleteAlbum() {
        var albumid = this.state.albumid;
        console.log(albumid);
        request.post(domain + 'album/delete')
            .send({ albumid: albumid })
            .end((err) => {
                if (err) { console.log('DELETE ALBUM ERROR: ' + err); }
            });

        this.setState({
            backToList: true
        });
    }

    handleNewTagsChange(e) {
        this.setState({ newTags: e.target.value });
    }

    addTags(e) {
        e.preventDefault();

        var albumid = this.state.albumid;
        var newTags = this.state.newTags;

        request.post(domain + 'album/addtags')
            .send({
                albumid: albumid,
                newTags: newTags
            })
            .end((err, res) => {
                if (err) { console.log('HANDLE ERROR: ' + err); }
                this.getAlbum();
            });
    }

    removeTag(e) {
        e.preventDefault();

        var albumid = this.state.albumid;

        //console.log(e.target.dataset.tag);
        request.post(domain + 'album/removetag')
            .send({
                albumid: albumid,
                tagid: this.state.album.tags[e.target.dataset.tag]._id
            })
            .end((err, res) => {
                if (err) { console.log('HANDLE ERROR: ' + err); }
                this.getAlbum();
                return res;
            });
    }
    componentDidMount() {
        console.log(this.props);
        this.setState({
            albumid : (this.props && this.props.location.state && this.props.location.state.albumid) ? this.props.location.state.albumid : undefined, 
            tagId : this.props.tagId ? this.props.tagId : (this.props && this.props.location.state && this.props.location.state.tagId) ? this.props.location.state.tagId : undefined
        },
            () => {this.getAlbum();}
        )
        //console.log(this.props.location.state);
    }
    componentWillReceiveProps(newProps) {
        console.log('WILL RECEIVE PROPS ');
        console.log(this.props);
        console.log(newProps);
        this.setState({
            albumid : (newProps.location.state && newProps.location.state.albumid) ? newProps.location.state.albumid : undefined, 
            tagId : newProps.tagId ? newProps.tagId : (newProps.location.state && newProps.location.state.tagId) ? newProps.location.state.tagId : undefined
        },
            () => {this.getAlbum();}
        )
    }

    render() {
        console.log('MOUNT STATE : ');
        console.log(this.props.location.state);
        //console.log(this.state.album);
        //console.log(this.state.images);
        var albumid = this.state.albumid;
        var tagId = this.state.tagId;
        var images = (this.state.album && this.state.album.images) ? this.state.album.images : this.state.images ;
        var tags = (this.state.album && this.state.album.tags) ? this.state.album.tags : undefined;
        
        var imagePresentation = images.map((image, index) => {
            var link = image.path.substr(6);
            return (
                <div className='album-image' key={index}>
                    <img src={link} alt='cannot find' onClick={this.state.delete ? this.select : this.showImage} data-key={index}>
                    {/* <ImageEdit imageId={image._id}/> */}
                </img></div>
            )
        });

        /*var tags = this.state.album.tags ? this.state.album.tags.map((tag, index) => {
            return (
                <div className='tagWrap' key={index}>
                    {tag.name}
                    <button onClick={this.removeTag} data-tag={index}>Delete tag</button>
                </div>
            )
        }) : null;*/

        if (this.state.backToList) {
            return <Redirect push to='/albums' />
        } else {
            return (
                <div className='album-view album-view-in' id='album-view'>
                    
                    {!this.state.tagId &&
                    <AlbumMenu 
                        albumid={albumid}
                        getAlbum={this.getAlbum}
                        deleteAlbum={this.deleteAlbum}
                        delete={this.state.delete}
                        handleDeletion={this.handleDeletion}
                        toggleDeletion={this.toggleDeletion}
                        addTags={this.addTags}
                        handleNewTagsChange={this.handleNewTagsChange}
                        tags={tags}
                        removeTag={this.removeTag}
                        />
                    }
                    <div className='album-title'>{this.state.tagName ? this.state.tagName : this.state.album.name ? this.state.album.name : ''}</div>

                    {imagePresentation}


                    <Lightbox
                        imageCount={this.state.images.length}
                        currentIndex={this.state.currentIndex}
                        path={this.state.currentImage}
                        hideImage={this.hideImage}
                        show={this.state.lightbox}
                        nextImage={this.nextImage}
                        prevImage={this.prevImage}
                    />
                </div>
            );
        }
    }
}

export default AlbumView;
