import React, { Component, useState, useEffect } from 'react';




const Search = () => {
    const [coordinates, setCoordinates] = useState({ lan: "", lon: "" });
    const [values, setValues] = useState({});

    const handleChange = (e) => {

        setCoordinates({ ...coordinates, [e.target.name]: e.target.value })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        GetSearchApiResults();
        alert('A name was submitted: ' + coordinates.lan);

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

            )
            .then(data => setValues(data[0][1]));
    }
    useEffect(() => {
        // Update the document title using the browser API

    }, [coordinates]);


    return (
        <div>
          
           

            <form onSubmit={handleSubmit}>
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

            <p> {values.symbol_code} </p>
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