const clusterName = 'octagon58';

const loginUrl = 'https://auth.${clusterName}.hasura-app.io/v1/login';
const signupUrl = 'https://auth.'+ clusterName +'.hasura-app.io/v1/signup';

import { Alert } from 'react-native';

const networkErrorObj = {
    status: 503
};
/**
 * Signup new user.
 * @param {string} email Email adress of he user.
 * @param {string} password Password of the user.
 * @return {string} API response.
 */
export async function trySignup(email, password) {
    console.log('Making signup query');
    console.log(email);
    console.log(password);
    let requestOptions = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
        },
    };
    let body = {
        'provider': 'username',
        'data': {
          'username': email,
          'password': password,
        },
      };

    requestOptions['body']= JSON.stringify(body);
    console.log('Auth response -----------------------');

    try {
        console.log('fetching');
        let resp = await fetch(signupUrl, requestOptions);
        console.log(resp);
        let responseJson = await resp.json();  
        console.log(responseJson);
        let resUsername = JSON.stringify(responseJson.username);
        let resHasuraid = JSON.stringify(responseJson.hasura_id);
        console.log(resUsername);
        console.log(resHasuraid);
        return resp;
    } catch (e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

