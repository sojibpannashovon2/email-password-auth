import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')


    const handleSubmission = (event) => {
        setSuccess('');
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setError('');
        //.....................validation check........................

        // const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!(/^(?=.*[a-z]).*$/).test(password)) {
            setError("Password must have at least one Lowercase Character.");
            return;
        }

        // const isContainsNumber = /^(?=.*[0-9]).*$/;
        else if (!(/^(?=.*[0-9]).*$/).test(password)) {
            setError("Password must contain at least one Digit.");
            return;
        }

        // const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        else if (!(/^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/).test(password)) {
            setError("Password must contain at least one Special Symbol.");
            return;
        }
        else if (password.length < 6) {
            setError("Password must be 6 charater");
            return;
        }
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                if (!loggedUser.emailVerified) {
                    alert("how are you")
                }
                // event.target.reset();
                setSuccess('Successfully LogIn');
                setError('')

            })
            .catch(error => {
                // console.log(error.code);
                console.log(error.meassage);
                setError(error.meassage)
            })


    }

    return (
        <div className='container'>
            <h1 className='text-center mt-5'>Login</h1>
            <form onSubmit={handleSubmission} className="mx-auto col-md-6">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' placeholder="Enter email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" />
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className='mt-4' ><small>Are you new to this website? Please <Link to='/resistor'>Resister</Link>  now !</small></p>
                <p className='text-center text-danger fw-bold'>{error}</p>
                <p className='text-center text-success fw-bold'>{success}</p>
            </form>
        </div>
    );
};

export default Login;