import React, { Component } from 'react';
import request from 'superagent';
import { Switch, Route, Link } from 'react-router-dom';

import config from '../config';
var domain = config.DOMAIN;

class TagList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.setState = this.setState.bind(this);

    }

    componentDidMount() {
        var endpoint = domain + '/tag/list';
        request.get(endpoint)
            .end((err, res) => {
                if (err) { console.log('HANDLE ERROR: ' + err); }
                //console.log(res.body[0]);
                this.setState({ tags: res.body });
                //console.log(this.state.albums);
                return res;
            });


    }

    render() {
        var tagNav = this.state.tags.map((tag) => {
            console.log(tag._id);
            return (
                <li key={tag._id}><Link to={{
                    pathname: `/tag/${tag.name}`,
                    state: {tagId: tag._id}
                }}>{tag.name}</Link></li>
            )
        }
            
        );
        return (
            <div className='TagList'>
                <ul>
                    {tagNav}
                </ul>
            </div>
        );
    }
}

export default TagList;