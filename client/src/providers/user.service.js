const UserService = {};
const endPoint = 'http://localhost:3000';
const getHeaders = () => {
   return {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
   };
};

UserService.register = (dataParams) => {
    const headers = getHeaders();
    return new Promise((resolve, reject) => {
        headers.body = JSON.stringify(dataParams);
        fetch(`${endPoint}/user/register`, headers)
        .then((response) => resolve(response.json()))
        .catch(err => reject(err));
    });
}

UserService.userList = () => {
    return new Promise((resolve, reject) => {
        fetch(`${endPoint}/user/userList`)
        .then((response) => resolve(response.json()))
        .catch(err=> reject(err));
    });
}

UserService.login = (dataParams) => {
    const headers = getHeaders();
    return new Promise((resolve, reject) => {
        headers.body = JSON.stringify(dataParams);
        fetch(`${endPoint}/user/login`, headers)
        .then((response) => {return response.json();})
        .then((response) => {
            const resp = response;
            if (!resp.email) return reject(resp);
            resolve(resp);
        })
        .catch(err => reject(err));
    });
}

UserService.searchUserId = (id) => {
    return new Promise((resolve, reject) => {
        fetch(`${endPoint}/user/searchUserId/${id}`)
        .then((response) => resolve(response.json()))
        .catch(err=> reject(err));
    });
}

UserService.edit = (dataParams) => {
    const headers = getHeaders();
    headers.method = 'PUT';
    return new Promise((resolve, reject) => {
        headers.body = JSON.stringify(dataParams);
        fetch(`${endPoint}/user/edit`, headers)
        .then((response) => resolve(response.json()))
        .catch(err => reject(err));
    });
}

UserService.removeUser = (id) => {
    const headers = getHeaders();
    headers.method = 'DELETE';
    return new Promise((resolve, reject) => {
        fetch(`${endPoint}/user/removeUser/${id}`, headers)
        .then((response) => resolve(response.json()))
        .catch(err => reject(err));
    });
}

export default UserService;