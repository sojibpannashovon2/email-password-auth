import React from 'react';
import '../App.css'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import app from '../firebase/firebase.init';


const auth = getAuth(app);
const Resistor = () => {

    const handleEmail = (event) => {
        console.log(event.target.value);
    }
    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.target);
        const email = event.target.email.value;
        const password = event.target.password.value;
        // console.log(event.target.password.value);
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loderUgger = result.user;
                console.log(loderUgger);
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            })
    }
    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Resistor</h1>

            <form onSubmit={handleSubmit} className='topo' >
                <input onChange={handleEmail} placeholder='Your email please' className='single' type="email" name="email" id="email" required />
                <br />
                <input onBlur={handlePasswordBlur} placeholder='Your password please' className='single' type="password" name="password" id="password" required />
                <br />
                <input placeholder='resister please' className='single' type="submit" name="Resistor" id="Resistor" />
                <br />
                <hr />
            </form>

        </div>
    );
};

export default Resistor;