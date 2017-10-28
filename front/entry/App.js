import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
//import logo from './logo.svg';
//import './App.css';

import Upload from './components/upload';
import AlbumCreate from './components/albumCreate';
import AlbumList from './components/albumList';
import AlbumView from './components/albumView';
import TagList from './components/tagList';
import TagView from './components/tagView';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Link to={`/image/upload`}>Image Upload</Link><br/>
        <Link to={`/album/create`}>Album Create</Link><br/>
        <Link to={`/albums`}>Album List</Link><br />
        <Link to={`/tags`}>Tags</Link>
        <Switch>
          <Route path='/image/upload' component={Upload} />
          <Route path='/album/create' component={AlbumCreate} />
          <Route exact path='/albums' component={AlbumList} />
          <Route path='/albums/:albumname' component={AlbumView} />
          <Route path='/tags' component={TagList} />
          <Route exact path='/tag/:tagname' component={TagView} />
          <Route path='/tag/:tagname/all' component={AlbumView} />
        </Switch>
      </div>
    );
  }
}

class Photos extends Component {
  render() {
    var root = this.props.location.pathname;
    console.log(root);
    console.log(this.props.match);
    console.log(root + '/albums/Toronto');
    return (
      <div className='photoGallery'>
        <Route path='/gallery/photography' render= {(props) => (
          <TagView {...props} tagName = 'photography' />
        )}/>
        <Route path='/gallery/artwork' render= {(props) => (
          <TagView {...props} tagName = 'artwork' />
        )}/>
        {/* <Switch>
          <Route path='/gallery/:category/albums/:albumname' component={AlbumView} />
          <Route path='/gallery/:category/all' component={AlbumView} />
        </Switch> */}
      </div>
    )
  }
}

export { App, Photos };
