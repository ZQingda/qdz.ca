import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
//import './index.css';
import { App, Photos } from './App';

//console.log('index.js!');
ReactDOM.render((
    <BrowserRouter>
        <Route path='/gallery/:category' component={Photos}/>
        {/* <App /> */}
    </BrowserRouter>
), document.getElementById('gallery'));
