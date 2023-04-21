import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { useState } from 'react';
import app from '../firebase/firebase.init';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const auth = getAuth(app);
const Login = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')
    const emailRef = useRef();

    //Add ToolTips 
    const handleClick = () => {
        toast.success("Successfully LogIn !!!", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    //Sweet alert function
    function handleButtonClick() {
        swal({
            title: "Error-Login",
            text: "User not register !!! You are new to website baby !!!",
            icon: "error",
            button: "OK"
        });
    }


    //show password

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    ////finish

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
                // if (!result.user.emailVerified) {
                //     alert("how are you")
                // }
                // event.target.reset();
                handleClick();
                setSuccess('Successfully LogIn');
                setError('')

            })
            .catch(error => {
                // console.log(error.code);
                // If the user is not registered, show an alert
                if (error.code === 'auth/user-not-found') {
                    // alert('User not registered.');
                    handleButtonClick();
                    setError('User not registered.')
                } else {
                    alert(error.message);
                }
                console.log(error.meassage);
                setError(error.meassage)
            })


    }

    const handleResetPassword = (event) => {
        const email = emailRef.current.value;
        console.log(emailRef.current.value);
        if (!email) {
            alert("Please enter your email to Reset Password");
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("please check your email")
            })
            .catch(error => {
                console.log(error.code);
                console.log(error.message);
            })


    }

    return (
        <div className='container'>
            <h1 className='text-center mt-5'>Login</h1>
            <form onSubmit={handleSubmission} className="mx-auto col-md-6">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' ref={emailRef} placeholder="Enter email" />
                </div>
                <div className="form-group">

                    <label htmlFor="password">Password</label>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} className="form-control" id="password" name='password' placeholder="Password" />
                    <button className='rounded-2 my-2 border border-primary' onClick={toggleShowPassword}>{showPassword ? "Hide Password" : "Show Password"}</button>
                    {/* <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name='password' placeholder="Password" /> */}
                </div>
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p className='mt-4' ><small>forget your password? Please <button onClick={handleResetPassword} className='btn btn-link'>Reset</button>  now !</small></p>

                <p className='mt-4' ><small>Are you new to this website? Please <Link to='/resistor'>Resister</Link>  now !</small></p>

                <p className='text-center text-danger fw-bold'>{error}</p>
                <p className='text-center text-success fw-bold'>{success}</p>
            </form>


            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;