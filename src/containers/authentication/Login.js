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
import { login } from "../../store/actions/authActions"

const Login = () => {
    const state = useSelector(state => state)
    const loggedStatus = state.auth.loggedIn
    const request = state.auth.request
    const invalidLogin = state.auth.invalidLogin

    const initialFormState = {  email: '', password: ''}
	const [ user, setUser ] = useState(initialFormState)
	const handleInputChange = event => {
		const { name, value } = event.target
		setUser({ ...user, [name]: value })
	}
    const dispatch = useDispatch();
    const [validateEmailStaus, setvalidateEmailStaus] = useState(false);

    function validateEmail(em) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(em);
    }
    const handleLogIn = (e) => {
        e.preventDefault()
				if (!user.email || !user.password)  {
                    setUser(initialFormState)
                } else if (!validateEmail(user.email)) {
                    setvalidateEmailStaus(true)
                } else {
                    dispatch(login(user.email, user.password));
                }
    };
    return (
        <>
            {loggedStatus === false ? (
                <div className="container-fluid bg">
                    <div className="row" style={{ height: '100vh' }}>
                        <div className="col-12 col-lg-4 form-login">
                            <form action="post">
                                <img src="/logo.png" alt="" />
                                <h5>Login</h5>
                                <Link to={"/registration"}>SIGN UP</Link>
                                <div className="mb-3">
                                    <TextField
                                        name="email"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Email"
                                        value={user.email} onChange={handleInputChange}
                                    />
                                       { validateEmailStaus && <div className="required">Email format is not correct</div>}
                                </div>
                                <div className="mb-5">
                                    <FormControl variant="outlined" size="small" fullWidth >
                                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            name="password"
                                            type="password"
                                            value={user.password} onChange={handleInputChange}
                                            required
                                            labelWidth={70}
                                        />
                                    </FormControl>
                                   
                                </div>
                                <small className={(loggedStatus === false ? 'required' : 'd-none')}>{invalidLogin}</small>
                                {request ? (<div className="spinner-border text-primary" role="status" ></div>) : (<></>)}
                                <button className="btn button-submit w-100 mb-5 " onClick={handleLogIn}>
                                    LOGIN
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

export default Login
