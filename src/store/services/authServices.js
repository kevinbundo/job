export const userAuthService = {
    login
};

function login(email, password) {

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };

    return fetch(`http://localhost:3001/users?email=${email}&password=${password}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            return data;
        })
}



