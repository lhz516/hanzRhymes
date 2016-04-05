import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Layout from './components/layout.jsx';
import Index from './components/index.jsx';
import About from './components/about.jsx';

const routes = () => (
    <Router history={browserHistory}>
        <Route component={Layout}>
            <Route path="/" component={Index} />
            <Route path="/about" component={About} />
        </Route>
    </Router>
);

Meteor.startup(() => {
    render(routes(), document.getElementById('app-container'));
});