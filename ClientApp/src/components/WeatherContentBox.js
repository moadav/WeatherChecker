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
                <p className="weatherinfo">Time: <strong>{this.props.time} </strong></p>
                <p className="weatherinfo">Temperature: <strong>{this.props.air_temperature}</strong> </p>
                <p className="weatherinfo"> Wind from direction:<strong> {this.props.wind_from_direction} </strong></p>
                <p className="weatherinfo">Wind speed: <strong>{this.props.wind_speed}</strong> </p>
                <p className="weatherinfo"> Symbole: <strong>{this.props.symbol_code} </strong> </p>
            </div>

        );
    }
}
