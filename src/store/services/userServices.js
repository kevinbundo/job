export const userService = {
    registrationUser,
    updateUser,
    deleteUser,

};
function registrationUser(firstName, lastName, email,phoneNumber, role,  password) {
    const data = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phoneNumber': phoneNumber,
        'role': role,
        'password': password,
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(data)
    };
    return fetch(`http://localhost:3001/users`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}

function updateUser(idUser, firstName, lastName, email,phoneNumber, role,  password) {
    const data = {
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'phoneNumber':phoneNumber,
        'role': role,
        "password": password
    }
   
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    return fetch(`http://localhost:3001/users/${idUser}`, requestOptions)

        .then(response => response.json())
        .then(data => {
            return data;
        })
}
function deleteUser(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    return fetch(`http://localhost:3001/users/${id}`, requestOptions)

        .then(response => response)
        .then(data => {
            return data;
        })
}
