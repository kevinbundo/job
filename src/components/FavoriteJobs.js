import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import { addFavoriteJobs, removefavoriteJobs } from '../store/actions/seekersActions'

const FavoriteJobs = ({ idList, favoriteId, idJobs }) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    let idUser = state.auth.userId
    const [saveRemoveJobs, setSaveRemoveJobs] = useState(favoriteId === idJobs);
  
    const handleFavoriteJobs = (type) => {
        setSaveRemoveJobs(!saveRemoveJobs)
        if (type === 0) {
            if (idList) {
                dispatch(removefavoriteJobs(idList));
            }
        } else {
            dispatch(addFavoriteJobs(idUser, idJobs));
        }
    }
    return (
        <>
            {favoriteId === idJobs ? (
                <BookmarkIcon className="favourite-icon" onClick={() => handleFavoriteJobs(0)} />
            ) : (
                <BookmarkBorderIcon className="favourite-icon" onClick={() => handleFavoriteJobs(1)} />)}
        </>
    )
}

export default FavoriteJobs
