export const favoriteJobs = {
    addFavoriteJobs,
    removefavoriteJobs,

};
function addFavoriteJobs(idUser, idJobs) {
    const data = {
        'idUser': idUser,
        'idJobs': idJobs,
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(data)
    };
    return fetch(`http://localhost:3001/jobsFaforite`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

function removefavoriteJobs(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:3001/jobsFaforite/${id}`, requestOptions)

        .then(response => response)
        .then(data => {
            return data;
        })
}
