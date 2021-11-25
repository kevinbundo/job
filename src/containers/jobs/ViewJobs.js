import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useSelector } from "react-redux";
import Layout from '../../components/Layout'
import FavoriteJobs from '../../components/FavoriteJobs'
const ViewJobs = (id) => {
    const [data, setData] = useState({});
    const idUrl = id.match.params.id
    const state = useSelector(state => state)
    const role = state.auth.role
    const userId = state.auth.userId
    const favoriteJobsState = state.favoriteJobs
    const [dataFavorite, setDataFavorite] = useState([]);
    let itemfavourite = dataFavorite.map(x => { return x.idJobs; })
    let existFavourite = itemfavourite.find(x => x === data.id);
    useEffect(() => {

        axios.get(`http://localhost:3001/listingJobs/${idUrl}`, {
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.error(error)
            })
        if (role === "seekers" || favoriteJobsState) {
            axios.get(`http://localhost:3001/jobsFaforite?idUser=${userId}`, {
            })
                .then((res) => {
                    setDataFavorite(res.data);
                })
                .catch((error) => {
                    console.error(error)
                })
        }
    }, [idUrl, userId, role, favoriteJobsState]);
    const htmlPart = data.description

    return (
        <Layout>
            <div className="container-fluid">
                <div className="container">
                    <div className="d-flex justify-content-between mt-5">
                        <h3 className="title-container">JOB</h3>
                        {role === "seekers" ? (<FavoriteJobs favoriteId={existFavourite} idJobs={data.id} />) : (<></>)}
                    </div>


                    <div className="p-1  mx-1 item-jobs-delalis">
                        <h4 className="item-name">Job:</h4> <h4>{data.position}</h4>
                    </div>
                    <div >
                        <div className="p-1  mx-1 item-jobs-delalis">
                            <h6 className="item-name">Name Company:</h6> <h6>{data.nameCompany}</h6>
                        </div>
                        <div className="p-1  mx-1 item-jobs-delalis">
                            <h6 className="item-name">Email Company:</h6> <h6>{data.emailCompany}</h6>
                        </div>
                        <div className="p-1  mx-1 item-jobs-delalis">
                            <h6 className="item-name">Number Company:</h6> <h6> {data.numberCompany}</h6>
                        </div>
                        <div className="p-1  mx-1 item-jobs-delalis">
                            <h6 className="item-name">Type:</h6> <h6> {data.type}</h6>
                        </div>
                        <div className="col-12 item-jobs-delalis">
                            <div dangerouslySetInnerHTML={{ __html: htmlPart }}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ViewJobs
