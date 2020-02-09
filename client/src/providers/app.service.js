const AppService = {};
const endPoint = 'http://localhost:3001';
const headers = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

AppService.register = (email, password) => {
    return new Promise((resolve, reject) => {
        headers.body = JSON.stringify({ email, password });
        fetch(`${endPoint}/register`, headers)
        .then((response) => resolve(response.json()))
        .catch(err=> reject(err));
    });
}

export default AppService;