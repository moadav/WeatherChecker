import './WeatherContentBox.css';
import React, { Component } from 'react';

export class WeatherContentBox extends Component {

    static displayName = WeatherContentBox.name;

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="wrapper">
                <p>{this.props.time} </p>
                <p>{this.props.air_temperature} </p>
                <p>{this.props.wind_from_direction} </p>
                <p>{this.props.wind_speed} </p>
                <p>{this.props.symbol_code} </p>
            </div>

        );
    }
}
