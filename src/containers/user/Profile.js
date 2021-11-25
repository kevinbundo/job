import React, { useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
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

import { updateUser, deleteUser } from "../../store/actions/userActions"
import Layout from '../../components/Layout';

const Profile = () => {

    const state = useSelector(state => state)
    const userRequest = state.user.userRequest
    const userId = state.auth.userId
    const [firstName, setFirstName] = useState(state.auth.firstName);
    const [lastName, setLastName] = useState(state.auth.lastName);
    const [phoneNumber, setPhoneNumber] = useState(state.auth.phoneNumber);
    const [role, setRole] = useState(state.auth.role);
    const [email, setEmail] = useState(state.auth.email);
    const [password, setPassword] = useState("");
    
    const [showPassword, setshowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const [validateEmailStaus, setvalidateEmailStaus] = useState(false);
    const [changeProfile, setChangeProfile] = useState(true);


    function validateEmail(em) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(em);
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        setSubmitted(true)
        if ((submitted && !firstName && !lastName && !email && !phoneNumber && !role && !password)) {
        } else if (!firstName || !lastName || !email || !phoneNumber || !role || !password) {
        } else if (!validateEmail(email)) {
            setvalidateEmailStaus(true)
        } else {
            dispatch(updateUser(userId, firstName, lastName, email, phoneNumber, role, password));
        }
    }

    const handleDeleteUser = () => {
        dispatch(deleteUser(userId));
    }
    return (
        <Layout location={"profile"}>
            <div className="container mt-5">
                <h3 className="title-container">Profile</h3>
                <div className="row">
                    <div className="col-12 col-md-6 mb-2">
                        <TextField
                            disabled={changeProfile}
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
                    <div className="col-12 col-md-6 mb-2">
                        <TextField
                            disabled={changeProfile}
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
                    <div className="col-12 col-md-6 mb-2">
                        <TextField
                            disabled={changeProfile}
                            error={submitted && !email}
                            name="email"
                            variant="outlined"
                            required={true}
                            fullWidth
                            size="small"
                            label={submitted && !email && validateEmailStaus ? "Email Validatre" : "Email"}
                            value={email} onChange={e => setEmail(e.target.value)}
                        />
                        {submitted && !email && <div className="required">Email  is required</div>}
                        {submitted && validateEmailStaus && <div className="required">Email format is not correct </div>}
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                        <TextField
                            disabled={changeProfile}
                            error={submitted && !phoneNumber}
                            name="phoneNumber"
                            variant="outlined"
                            required={true}
                            fullWidth
                            size="small"
                            label="Phone Number"
                            value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                        />
                        {submitted && !email && <div className="required">Email  Kerkohet</div>}
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                        <FormControl variant="outlined" size="small" fullWidth disabled={changeProfile}>
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
                    </div>

                    <div className="col-12 col-md-6">
                        <FormControl variant="outlined" size="small" fullWidth disabled={changeProfile}>
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
                    <div className="col-12">
                        {changeProfile ? (
                            <div className="div-submit">

                                <button className="btn button-submit w-100 mb-5 " disabled={userRequest} onClick={() => setChangeProfile(!changeProfile)}>
                                    EDIT PROFILE
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="div-submit">
                                    <button className="btn button-cancel  w-100 mb-5 " onClick={() => setChangeProfile(!changeProfile)}>
                                        Cancel
                                    </button>
                                    <button className="btn button-delete  w-100 mb-5 " disabled={userRequest} onClick={handleDeleteUser}>
                                        Delete
                                    </button>
                                    <button className="btn button-submit  w-100 mb-5 " disabled={userRequest} onClick={handleUpdateUser}>
                                        Save
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Profile

