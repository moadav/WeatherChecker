import React, { Component, useState } from 'react';
import { WeatherContentBox } from './WeatherContentBox';
import './WeatherSearch.css';

const Search = () => {
    const [coordinates, setCoordinates] = useState({ lan: "", lon: "" });
    const [values, setValues] = useState();

    const handleChange = (e) => {

        setCoordinates({ ...coordinates, [e.target.name]: e.target.value })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        GetSearchApiResults();
    }

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coordinates })
    }
    const GetSearchApiResults = async () => {
        fetch('WeatherSearch', request)
            .then(response =>

                response.json()

        ).then(data => setValues(data[0][0]));
    }


    return (
        <div>
          
           

            <form className="SubmitForm" onSubmit={handleSubmit}>
                <label>
                    lon:
                    <input type="text" name="lon" value={coordinates.lon} onChange={handleChange} />
                </label>
                <label>
                    lan:
                    <input type="text" name="lan" value={coordinates.lan} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {values ? <WeatherContentBox time={values.time} air_temperature={values.air_temperature} wind_from_direction={values.wind_from_direction} wind_speed={values.wind_speed} symbol_code={values.symbol_code} />
                :
                null}
            
        </div>

         
    );

};







export class WeatherSearch extends Component {
    static displayName = WeatherSearch.name;

    constructor(props) {
        super(props);

    }




    render() {
        return (

            <Search />
        );
    }
}