import React from 'react'
import { useSelector } from "react-redux";
import EditIcon from '@material-ui/icons/Edit'
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import BusinessIcon from '@material-ui/icons/Business';
import { Link } from 'react-router-dom';
import FavoriteJobs from './FavoriteJobs';

const ItemJobs = ({ data, favourite }) => {
    const state = useSelector(state => state)
    const role = state.auth.role
    let itemfavourite = favourite.map(x => { return x.idJobs; })
    let existFavourite = itemfavourite.find(x => x === data.id);

    return (
        <>
            <div className="col-12 item-jobs">
                <div className="row">
                    <div className="col-10 py-3">
                        <Link to={`/jobs/${data.id}`}>
                            <h4>{data.position}</h4>
                        </Link>
                        <div className="d-flex py-2">
                            <BusinessIcon className="favourite-icon" /><h6 onClick={() => window.open(`${data.webCompany}`, "_blank")}>{data.nameCompany}</h6>
                        </div>
                        <div className="d-md-flex">
                            <h6 className="mr-2"><EmailIcon className="favourite-icon" /> {data.emailCompany}</h6>
                            <h6><PhoneIcon className="favourite-icon" /> {data.numberCompany}</h6>
                        </div>
                    </div>
                    <div className="col-2 item-jobs-right">
                        {role === "seekers" ? (
                            <>
                                <FavoriteJobs favoriteId={existFavourite} idJobs={data.id} />
                            </>
                        ) : (
                            <Link to={`/createeditjobs/${data.id}`}>
                                <EditIcon className="favourite-icon" />
                            </Link>
                        )}

                    </div>
                </div>
            </div>

        </>
    )
}

export default ItemJobs
