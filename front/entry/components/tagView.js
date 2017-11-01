import React, { Component } from 'react';
import request from 'superagent';
import { Switch, Route, Link } from 'react-router-dom';

import AlbumView from './albumView'

var domain = 'http://138.197.142.130:3001/';

class TagView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: {}
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setState = this.setState.bind(this);

    }

    componentDidMount() {
        console.log(this.props.location);
        var tagQuery = {};
        console.log(this.props);
        console.log(this.props.match.params);
        if (this.props.location && this.props.location.state && this.props.location.state.tagId) tagQuery._id = this.props.location.state.tagId;
        if (this.props.tagName) tagQuery.name = this.props.tagName;
        console.log(tagQuery);
        var endpoint = domain + 'tag/get';
        console.log(endpoint);
        request.get(endpoint)
            .query(tagQuery)
            .end((err, res) => {
                if (err) { console.log('HANDLE ERROR: ' + err); }
                //console.log(res.body[0]);
                console.log('TAG INFO: ')
                console.log(res.body);
                this.setState({ tag: res.body });
                //console.log(this.state.albums);
                return res;
            });


    }

    render() {
        console.log('TAGVIEW PROPS : ');
        console.log(this.props);
        var albumNav = this.state.tag.albums ? this.state.tag.albums.map((album) =>
            <li className='tag-album' key={album._id}><Link to={{
                pathname: `/gallery/${this.props.tagName}/albums/${album.name}`,
                state: { albumid: album._id }
            }}>{album.name.toLowerCase()}</Link></li>
        ) : null;
        return (
            <div className='tag-view tag-view-in' id='tag-view'>
                <div className='tag-list-wrap'>
                    <ul className='tag-list'>
                        <li className='tag-album'><Link to={{
                            pathname: `/gallery/${this.props.tagName}`,
                            state: {
                                tagId: this.state.tag._id
                            }
                        }}>all images</Link></li>
                        {albumNav}
                    </ul>
                </div>
                <Switch>
                    <Route path='/gallery/:category/albums/:albumname' component={AlbumView} />
                    <Route path='/gallery/:category' render={(props) => (
                        <AlbumView {...props} tagId={this.state.tag._id} />
                    )} />
                </Switch>
            </div>
        );
    }
}

export default TagView;
