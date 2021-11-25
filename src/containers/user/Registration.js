/* eslint-disable no-useless-escape */
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { registrationUser } from "../../store/actions/userActions"

const Registration = () => {

    const state = useSelector(state => state)
    const loggedStatus = state.auth.loggedIn
    const request = state.auth.request
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const [showPassword, setshowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const [validateEmailStaus, setvalidateEmailStaus] = useState(false);

    function validateEmail(em) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(em);
    }

    const handleRegistrationUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if ((submitted && !firstName && !lastName && !email && !phoneNumber && !role && !password)) {
        } else if (!firstName || !lastName || !email || !phoneNumber || !role || !password) {
        } else if (!validateEmail(email)) {
            setvalidateEmailStaus(true)
        } else {
            dispatch(registrationUser(firstName, lastName, email, phoneNumber, role, password));
        }
    }
    return (
        <>
            {loggedStatus === false ? (
                <div className="container-fluid bg">
                    <div className="row" style={{ height: '100vh' }}>
                        <div className="col-12 col-lg-4 form-login">
                            <form action="post">
                                <img src="/logo.png" alt="" />
                                <h5>SIGN UP</h5>
                                <Link to={"/login"}>Login</Link>
                                <div className="mb-3">
                                    <TextField
                                        error={submitted && !firstName}
                                        name="firstName"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="First Name"
                                        value={firstName} onChange={e => setFirstName(e.target.value)}
                                    />
                                    {submitted && !firstName && <div className="required">First Name is required</div>}
                                </div>
                                <div className="mb-3">
                                    <TextField
                                        error={submitted && !lastName}
                                        name="lastName"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Last Name"
                                        value={lastName} onChange={e => setLastName(e.target.value)}
                                    />
                                    {submitted && !email && <div className="required">Last Name is required</div>}
                                </div>
                                <div className="mb-3">
                                    <TextField
                                        error={submitted && !email}
                                        name="email"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label={submitted && !email && validateEmailStaus ? "Email Validatre" : "Email"}
                                        value={email} onChange={e => setEmail(e.target.value)}
                                    />
                                    {submitted && !email && <div className="required">Email is required</div>}
                                    {submitted && validateEmailStaus && <div className="required">Email format is not correct</div>}
                                </div>
                                <div className="mb-3">
                                    <TextField
                                        error={submitted && !phoneNumber}
                                        name="phoneNumber"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Phone Number"
                                        value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                                    />
                                    {submitted && !email && <div className="required">Phone Number is required</div>}
                                </div>
                                <div className="mb-3">
                                    <FormControl variant="outlined" size="small" fullWidth error={submitted && !role}>
                                        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={role}
                                            onChange={e => setRole(e.target.value)}
                                            label="Role"
                                        >
                                            <MenuItem value={"recruiters"}>Recruiters</MenuItem>
                                            <MenuItem value={"seekers"}>Seekers</MenuItem>
                                        </Select>
                                    </FormControl>
                                    {submitted && !role && <div className="required">Role  is required</div>}
                                </div>

                                <div className="mb-5">
                                    <FormControl variant="outlined" size="small" fullWidth  error={submitted && !password}>
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password} onChange={e => setPassword(e.target.value)}

                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setshowPassword(!showPassword)}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                    {submitted && !password && <div className="required">Password  is required</div>}
                                </div>
                                {request ? (<><div className="spinner-border text-primary" role="status"></div></>) : (<></>)}
                                <button className="btn btn-outline-primary w-100 mb-5 " disabled={request} onClick={handleRegistrationUser}>
                                    SIGN UP
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            ) : (
                <Redirect to="/" />
            )}
        </>
    )
}

export default Registration
