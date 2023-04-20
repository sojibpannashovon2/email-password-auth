import React, { useState } from 'react';
import '../App.css'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth"
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';


const auth = getAuth(app);


const Resistor = () => {
    const [errorBT, setErrorBT] = useState('');
    const [success, setSuccess] = useState('')

    const handleEmail = (event) => {
        console.log(event.target.value);
    }
    const handlePasswordBlur = (event) => {
        console.log(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess('');
        setErrorBT('');
        console.log(event.target);
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password);
        // console.log(event.target.password.value);

        //.....................validation check........................

        // const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!(/^(?=.*[a-z]).*$/).test(password)) {
            setErrorBT("Password must have at least one Lowercase Character.");
            return;
        }

        // const isContainsNumber = /^(?=.*[0-9]).*$/;
        else if (!(/^(?=.*[0-9]).*$/).test(password)) {
            setErrorBT("Password must contain at least one Digit.");
            return;
        }

        // const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        else if (!(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/).test(password)) {
            setErrorBT("Password must contain at least one Special Symbol.");
            return;
        }

        // const isValidLength = /^.{10,16}$/;
        // else if (!(/^.{10,16}$/).test(password)) {
        //     setErrorBT("Password must be 10-16 Characters Long.");
        // }

        // else {
        //     return null;
        // }



        //create user in firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loderUgger = result.user;
                console.log(loderUgger);
                setErrorBT('');
                event.target.reset();
                //set successfully registration 
                setSuccess("Registration Successfulled !!!")
                //email verification caller function
                emailVerificationByDeveloper(loderUgger);

            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
                //set password error
                setErrorBT(error.message);
            })
    }
    const emailVerificationByDeveloper = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert("Please verify your email eddress")
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
                <p className='mt-4' ><small>Already have an account?  <Link to='/login'> Login</Link>  now !</small></p>
                <p className='text-center text-danger fw-bold'>{errorBT}</p>
                <p className='text-center text-success fw-bold'>{success}</p>
            </form>

        </div>
    );
};

export default Resistor;