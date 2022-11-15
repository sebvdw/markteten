let endpoint = "http://localhost:5000"

export class UserApi {
    login(user) {
        return fetch(endpoint+'/auth/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: user}),
        })
            .then((response) => {
                if(!response.ok) {
                    return catchError(response);
                }
                else {
                    return response.json();
                }
            })
    }

    register(user) {
        return fetch(endpoint+'/auth/register', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: user}),
        })
            .then((response) => {
                if(!response.ok) {
                    return catchError(response);
                }
                else {
                    return response.json();
                }
            })
    }
}

export const catchError = (err) => {
    console.log(err);
}


export default new UserApi();