import React from 'react'
import EmailIcon from '@material-ui/icons/Email';
import WorkIcon from '@material-ui/icons/Work';
import PhoneIcon from '@material-ui/icons/Phone';
import { Link } from 'react-router-dom';
import FavoriteJobs from './FavoriteJobs';

const ItemJobsFavorite = ({ data, favourite }) => {
    return (
        <>
            {favourite.map((datafavorite, index) => (
                <div key={index}>
                    {datafavorite.idJobs === data.id ? (
                        <div className="col-12 item-jobs">
                            <div className="row">
                                <div className="col-10">
                                    <Link to={`/jobs/${data.id}`}>
                                        <h4><WorkIcon className="favourite-icon" />{data.position}</h4>
                                    </Link>
                                    <h6 onClick={() => window.open(`${data.webCompany}`, "_blank")}>{data.nameCompany}</h6>
                                    <div className="d-md-flex">
                                        <h6><EmailIcon className="favourite-icon" /> {data.emailCompany}</h6>
                                        <h6><PhoneIcon className="favourite-icon" /> {data.numberCompany}</h6>
                                    </div>
                                </div>
                                <div className="col-2 item-jobs-right">
                                    <>
                                        <FavoriteJobs idList={datafavorite.id} favoriteId={datafavorite.idJobs} idJobs={data.id} />
                                    </>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

            ))}
        </>
    )
}

export default ItemJobsFavorite
