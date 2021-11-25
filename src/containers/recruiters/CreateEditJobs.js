import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import { createJobs, updateJobs, deleteJobs } from '../../store/actions/jobsActions'
import Layout from '../../components/Layout'


const CreateEditJobs = (id) => {

    const idUrl = id.match.params.id
    const state = useSelector(state => state)
    const idCreatet = state.auth.userId
    const role = state.auth.role
    const jobsRequest = state.jobs.jobsRequest

    const dispatch = useDispatch();
    const initialFormState = { 
        title: '', 
        nameCompany: '', 
        numberCompany: '', 
        emailCompany: '', 
        webCompany: '', 
        type: '', 
        description: '',
        roleSelect: ''  }
	const [ job, setJob ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target;
		setJob({ ...job, [name]: value });
	}

    useEffect(() => {
        if (idUrl) {
            axios.get(`http://localhost:3001/listingJobs/${idUrl}`, {
                headers: { 'Content-Type': 'application/json' },
            })
                .then((res) => {
                    setJob({
                        title: res.data.title, 
                        nameCompany: res.data.nameCompany, 
                        numberCompany: res.data.numberCompany, 
                        emailCompany: res.data.emailCompany, 
                        webCompany: res.data.webCompany, 
                        type: res.data.type, 
                        description: res.data.description,
                        roleSelect: res.data.roleSelect 
                    })
                })
                .catch((error) => {
                    console.error(error)
                })
        }

    }, [idUrl]);

    const handleCreateJobs = (e) => {
        e.preventDefault()
        if ((  !job.title && !job.roleSelect && !job.nameCompany && !job.numberCompany && !job.emailCompany && !job.description && !job.webCompany)) {

             } else if (!job.title || !job.roleSelect || !job.nameCompany || !job.numberCompany || !job.emailCompany || !job.description || !job.webCompany ) {
             } else {
                setJob(initialFormState);
        dispatch(createJobs(idCreatet, job.title, job.roleSelect, job.description, job.nameCompany, job.numberCompany, job.emailCompany, job.webCompany, job.type));
        }
    }

    const handleUpdateJobs = (e) => {
        e.preventDefault()
        dispatch(updateJobs(idCreatet, job.title, job.roleSelect, job.description, job.nameCompany, job.numberCompany, job.emailCompany, job.webCompany, job.type, idUrl));
        
    }
    const handleDeleteJobs = (e) => {
        dispatch(deleteJobs(idUrl));
    }
    return (
        <>
            {role === "recruiters" ? (
                <Layout location={"createeditjobs"}>
                    <div className="conteinar-fluid">
                        <div className="container mt-5">
                            {idUrl ? (<h3 className="title-container">Edit Job</h3>) : (<h3 className="title-container">Create new Job</h3>)}
                            <div className="row">
                                <div className="col-12 col-md-4 mb-3">
                                    <TextField
                                        name="title"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Title"
                                        value={job.title} onChange={handleInputChange}
                                    />
                                     { !job.title && <div className="required">Title is required</div>}
                                </div>
                                <div className="col-12 col-md-4 mb-3">
                                    <TextField
                                        name="nameCompany"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Name of Company"
                                        value={job.nameCompany} onChange={handleInputChange}
                                    />
                                    { !job.nameCompany && <div className="required">Title is required</div>}
                                </div>
                                <div className="col-12 col-md-4 mb-3">
                                    <FormControl variant="outlined" size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            name="roleSelect"
                                            value={job.roleSelect}
                                            onChange={handleInputChange}
                                            label="Role"
                                        >
                                            <MenuItem value={""}>All</MenuItem>
                                            <MenuItem value={"Front-end-Developer"}>Front-end Developer</MenuItem>
                                            <MenuItem value={"Back-end-Developer"}>Back-end Developer</MenuItem>
                                            <MenuItem value={"DevOps"}>DevOps</MenuItem>
                                            <MenuItem value={"Cyber-Security"}>Cyber Security</MenuItem>
                                            <MenuItem value={"Specialist-IT"}>Specialist IT</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-12 col-md-4 mb-3">
                                    <TextField
                                        name="numberCompany"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Telephone Number"
                                        value={job.numberCompany} onChange={handleInputChange}
                                    />
                                    { !job.numberCompany && <div className="required">Title is required</div>}
                                </div>
                                <div className="col-12 col-md-4 mb-3">
                                    <TextField
                                        name="emailCompany"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Email Company"
                                        value={job.emailCompany} onChange={handleInputChange}
                                    />
                                    { !job.emailCompany && <div className="required">Title is required</div>}
                                </div>
                                <div className="col-12 col-md-4 mb-3">
                                    <TextField
                                        name="webCompany"
                                        variant="outlined"
                                        required={true}
                                        fullWidth
                                        size="small"
                                        label="Web Company"
                                        value={job.webCompany} onChange={handleInputChange}
                                    />
                                     { !job.webCompany && <div className="required">Title is required</div>}
                                </div>
                                <div className="col-12 col-md-4 mb-3">
                                    <FormControl variant="outlined" size="small" fullWidth>
                                        <InputLabel id="demo-simple-select-outlined-label">Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            name="type"
                                            value={job.type}
                                            onChange={handleInputChange}
                                            label="Type"
                                        >
                                            <MenuItem value={"Full-Time"}>Full Time</MenuItem>
                                            <MenuItem value={"Part-Time"}>Part Time</MenuItem>

                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-12">
                                <TextField
                                            id="filled-multiline-static"
                                            name="description"
                                            required={true}
                                            value={job.description}
                                            onChange={handleInputChange}
                                            label="Description"
                                            multiline
                                            rows={5}
                                            variant="filled"
                                            style ={{width: '100%'}}
                                                />
                                                { !job.description && <div className="required">Title is required</div>}
                                </div>
                                {idUrl ? (
                                    <div className="col-12 col-md-3 div-submit">
                                        <button className="btn button-delete w-100" onClick={handleDeleteJobs}>
                                            Delete
                                        </button>
                                        <button className="btn button-submit w-100" disabled={jobsRequest} onClick={handleUpdateJobs}>
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    <div className="col-12 col-md-3 div-submit">
                                        <button className="btn button-submit w-100" disabled={jobsRequest} onClick={handleCreateJobs}>
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div >
                </Layout >
            ) : (
                <Redirect to="/" />
            )}
        </>
    )
}

export default CreateEditJobs