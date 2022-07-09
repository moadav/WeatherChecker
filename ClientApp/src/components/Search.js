import React, { useState } from 'react';

 export default Search = () => {
    const [coordinates, setCoordinates] = useState({ lan: "", lon: "" })


     const handleChange = (e) => {
         setCoordinates({ ...coordinates, [e.target.name]: e.target.value })


     }
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('A name was submitted: ' + coordinates);

    }
    return (

        <div>
            <h1>Hello Weather Search</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    lon:
                    <input type="text" value={coordinates.lon} onChange={handleChange} />
                </label>
                <label>
                    lan:
                    <input type="text" value={coordinates.lan} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>



        </div>
    );
}