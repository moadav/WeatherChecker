import React, { Component, useState, useCallback } from 'react';
import { WeatherContentBox } from './WeatherContentBox';
import './WeatherSearch.css';

const Search = () => {
    const [municipality, setMunicipality] = useState("");
    const [error, setError] = useState("Please enter a municipality");
    const [values, setValues] = useState();

    const handleChange = (e) => {

        setMunicipality(e.target.value)


    }
    const handleSubmit = (event) => {
        event.preventDefault();
        GetSearchApiResults();




    }

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ municipality })
    }
    const GetSearchApiResults = async () => {
        fetch('WeatherSearch', request)
            .then(response =>

                response.json()

            ).then(data => {
                setValues(data[0][0]);
                if (values)
                    setMunicipality(municipality);
                setError("Could not find Municipality by name: " + municipality);

            }

            );
    }


    return (
        <div>



            <form className="SubmitForm" onSubmit={handleSubmit}>
                <label>
                    KommuneNavn:
                    <input type="text" value={municipality} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>

            {values ? <WeatherContentBox time={values.time} air_temperature={values.air_temperature} wind_from_direction={values.wind_from_direction} wind_speed={values.wind_speed} symbol_code={values.symbol_code} />
                :
                <p> {error} </p>}


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