import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Layout from "../../components/Layout"
import ItemJobsFavorite from "../../components/ItemJobsFavorite";
import Search from "../../components/Search";
const MyPositionFavourite = () => {
    const state = useSelector(state => state)
    const role = state.auth.role
    const userId = state.auth.userId
    const [search, setSearch] = useState("");
    const [dataJson, setDataJson] = useState([]);
    const [dataFavourite, setDataFavourite] = useState([]);
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
                    setDataFavourite(res.data);
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
   
        return data
    }, [search, dataJson]);

    return (
        <Layout location={"favourite"}>
            <div className="container mt-5">
                <h3 className="title-container">MY JOB FAVORITE</h3>
                <div className="col-12 mb-3 px-0">
                    <Search onSearch={value => { setSearch(value) }} />
                </div>

                {dataMemo.map((data, index) => (
                    <div key={index}>
                        <ItemJobsFavorite data={data} favourite={dataFavourite} location={"MyJobFavorite"} />
                    </div>
                ))}
            </div>

        </Layout>
    )
}

export default MyPositionFavourite
