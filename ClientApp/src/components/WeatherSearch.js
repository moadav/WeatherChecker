import React, { Component, useState } from 'react';




const Button = () => {
    const [coordinates, setCoordinates] = useState({ lan: "", lon: "" })


    const handleChange = (e) => {

        setCoordinates({ ...coordinates, [e.target.name]:e.target.value })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + coordinates.lan);

    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                lon:
                <input type="text" name = "lon" value={coordinates.lon} onChange={handleChange} />
            </label>
            <label>
                lan:
                <input type="text" name="lan" value={coordinates.lan} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
};





export class WeatherSearch extends Component {
    static displayName = WeatherSearch.name;

    constructor(props) {
        super(props);

    }




    render() {
        return (

            <Button />
        );
    }
}