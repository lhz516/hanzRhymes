import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import Layout from './components/layout.jsx';
import HomePage from './container/home.jsx';
import About from './components/about.jsx';
import * as reducers from './reducers/index.js';

// Add the reducer to your store on the `routing` key
export const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    {
        visibilityFilter: 'SHOW_OFTEN',
        rhyme: ''
    }
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const routes = () => (
    <Provider store={store}>
        <Router history={history}>
            <Route component={Layout}>
                <Route path="/" component={HomePage} />
                <Route path="/about" component={About} />
            </Route>
        </Router>
    </Provider>
);

Meteor.startup(() => {
    render(routes(), document.getElementById('app-container'));
});