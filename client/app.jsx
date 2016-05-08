import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { Meteor } from 'meteor/meteor';
import Layout from './components/layout.jsx';
import HomePage from './container/home.js';
import About from './components/about.jsx';
import { setRhyme } from './actions'
import * as reducers from './reducers';
import { searchRhyme } from './container/home.js';

// Add the reducer to your store on the `routing` key

let recentRhymes = JSON.parse(localStorage.getItem('hr_rhymes'));

export const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    }),
    {
        visibilityFilter: 'SHOW_OFTEN',
        rhyme: recentRhymes ? recentRhymes[recentRhymes.length - 1] : '',
        recentRhymes: recentRhymes || []
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
    let initState = store.getState();
    if(initState.rhyme) {
        store.dispatch(setRhyme(initState.rhyme));
        searchRhyme(initState.rhyme, initState.visibilityFilter);
    }
});