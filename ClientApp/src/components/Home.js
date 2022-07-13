import React, { Component } from 'react';
import { ContentItems } from './ContentItems';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1> Welcome to Weather Checker application </h1>
                <p> Simple application created with react to show weather information for a specific municipality.  </p>
                <p> All data is received from "Meteorologisk institutt" and ws.geonorge.no </p>
                <ContentItems />
            </div>

        );
    }
}
