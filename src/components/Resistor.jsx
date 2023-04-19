import React from 'react';
import '../App.css'
const Resistor = () => {

    const handleEmail = (event) => {
        console.log(event.target.value);
    }
    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    }
    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Resistor</h1>

            <form className='topo' action="" >
                <input onChange={handleEmail} placeholder='Your email please' className='single' type="email" name="email" id="email" />
                <br />
                <input onBlur={handlePasswordBlur} placeholder='Your password please' className='single' type="password" name="password" id="password" />
                <br />
                <input onSubmit={handleSubmit} placeholder='resister please' className='single' type="submit" name="Resistor" id="resistor" />
                <br />
                <hr />
            </form>

        </div>
    );
};

export default Resistor;