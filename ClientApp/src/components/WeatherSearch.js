import React, { Component, useState } from 'react';
import { WeatherContentBox } from './WeatherContentBox';
import './WeatherSearch.css';


const Search = () => {
    const [municipality, setMunicipality] = useState("");
  
    const [error, setError] = useState("");
    const [values, setValues] = useState();

    /**
     * Saves the Municipality name from the input to useState
     * @param {any} e The input event
     */
    const handleChange = (e) => {

        setMunicipality(e.target.value)


    }
    /**
     * Fetches an array of weather information handled in the .NET backend
     * @param {any} event the input event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        GetSearchApiResults();
        



    }

    /**
     * The fetch- request settings
     * */
    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ municipality })
    }

    /**
     * Fetches the JSON result from the API and sets the municipality value or Error value depending of results given
     * */
    const GetSearchApiResults = async () => {
        fetch('WeatherSearch', request)
            .then(response =>

                response.json()

            ).then(data => {
                setValues(data[0][0]);
                if (values)
                    setMunicipality(municipality);
                setError("Could not find a municipality with name: " + municipality);
     

            }

            );
    }
    return (
        <div>



            <form className="SubmitForm" onSubmit={handleSubmit}>
                <label className="labeltext">
                    Write the name of a norwegian municipality here:
                    <input type="text" value={municipality} onChange={handleChange} />
                </label >

               
                <input type="submit" value="Submit" />
            </form>

            {values ? <WeatherContentBox time={values.time} air_temperature={values.air_temperature} wind_from_direction={values.wind_from_direction} wind_speed={values.wind_speed} symbol_code={ values.symbol_code} />
                :
                <p className="errorMessage"> {error} </p>}


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