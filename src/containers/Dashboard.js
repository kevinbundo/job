import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout"
import ItemJobs from "../components/ItemJobs";

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Search from "../components/Search";


const Dashboard = () => {
    const state = useSelector(state => state)
    const role = state.auth.role
    const userId = state.auth.userId
    const [search, setSearch] = useState("");
    const [roleSelect, setRoleSelect] = useState("");

    const [dataJson, setDataJson] = useState([]);
    const [dataFavorite, setDataFavorite] = useState([]);
    const favoriteJobsState = state.favoriteJobs


    useEffect(() => {
        if (role === "seekers" || favoriteJobsState) {
            axios.get(`http://localhost:3001/listingJobs`, {
            })
                .then((res) => {
                    setDataJson(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
            axios.get(`http://localhost:3001/jobsFaforite?idUser=${userId}`, {
            })
                .then((res) => {
                    setDataFavorite(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        } else {
            axios.get(`http://localhost:3001/listingJobs?idCreatet=${userId}`, {
            })
                .then((res) => {
                    setDataJson(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        }

    }, [role, userId, favoriteJobsState]);

    const dataMemo = useMemo(() => {
        let data = dataJson;

        if (search) {
            data = data.filter(
                data =>
                    data.title.toLowerCase().includes(search.toLowerCase())
            )
        }
        if (roleSelect) {
            data = data.filter(
                data =>
                    data.position.toLowerCase().includes(roleSelect.toLowerCase())
            );
        }
        return data
    }, [search, roleSelect, dataJson]);

    return (
        <Layout location={"dashboard"}>
            <div className="conteinar-fluid dashboard">
                <div className="container ">
                    <div className="row ">
                        <div className="col-12 col-md-6">
                            {role === "seekers" ? (<><h2>Join us and Explore Thousands of Jobs</h2>
                                <h5>Find Jobs, Employment and Career Opportunities</h5></>
                            ) : (
                                <h2>My List Jobs</h2>
                            )}

                            <div className="container-search">

                                <Search onSearch={value => { setSearch(value) }} />

                                <FormControl variant="outlined" size="small" fullWidth>
                                    <InputLabel id="demo-simple-select-outlined-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        value={roleSelect}
                                        onChange={e => setRoleSelect(e.target.value)}
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
                        </div>

                    </div>
                </div>
            </div>
            <div className="conteinar-fluid container-list">
                <div className="container">
                    <h3 className="title-container">JOB</h3>
                    {dataMemo.map((data, index) => (
                        <div key={index}>
                            <ItemJobs data={data} favourite={dataFavorite}/>
                        </div>
                    ))}
                </div>
            </div>

        </Layout>

    )
}

export default Dashboard
