import React, { Component, useState,useEffect } from 'react';




const Search = () => {
    const [coordinates, setCoordinates] = useState({ lan: "", lon: "" })


    const handleChange = (e) => {

        setCoordinates({ ...coordinates, [e.target.name]:e.target.value })

    }
    const handleSubmit = (event) => {
        event.preventDefault();
   
        alert('A name was submitted: ' + coordinates.lan);

    }
    useEffect(() => {
        // Update the document title using the browser API
        GetSearchApiResults();
    },[]);
       
    
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

const GetSearchApiResults = async () => {
    fetch('WeatherSearch')
        .then(response => 

            response.json()

        )
        .then(data => console.log(data));
        
        
}



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