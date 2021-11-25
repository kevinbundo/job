export const jobsService = {
    createJobs,
    updateJobs,
    deleteJobs,
};
function createJobs(idCreatet, title,position, description,nameCompany, numberCompany, emailCompany, webCompany, type) {
    const data = {
        'idCreatet': idCreatet,
        'title': title,
        'position': position,
        'description': description,
        'nameCompany': nameCompany,
        'numberCompany': numberCompany,
        'emailCompany': emailCompany,
        'webCompany': webCompany,
        'type':type,
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(data)
    };
    return fetch(`http://localhost:3001/listingJobs`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

function updateJobs(idCreatet,title,position, description,nameCompany, numberCompany, emailCompany, webCompany, type, id) {
    const data = {
        'idCreatet': idCreatet,
        'title': title,
        'position': position,
        'description': description,
        'nameCompany': nameCompany,
        'numberCompany': numberCompany,
        'emailCompany': emailCompany,
        'webCompany': webCompany,
        'type':type,
    }
   
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    return fetch(`http://localhost:3001/listingJobs/${id}`, requestOptions)

        .then(response => response.json())
        .then(data => {
            return data;
        })
}
function deleteJobs(id) {


    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:3001/listingJobs/${id}`, requestOptions)

        .then(response => response.json())
        .then(data => {
            return data;
        })
}
