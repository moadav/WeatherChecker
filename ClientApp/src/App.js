import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { WeatherSearch } from './components/WeatherSearch';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />

                <Route path='/weather-search' component={WeatherSearch} />
            </Layout>
        );
    }
}
