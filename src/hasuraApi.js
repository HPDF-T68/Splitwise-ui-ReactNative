const clusterName = 'octagon58';

const loginUrl = 'https://app.octagon58.hasura-app.io/login';
const signupUrl = 'https://app.octagon58.hasura-app.io/signup';
const logoutUrl = 'https://auth.octagon58.hasura-app.io/v1/user/logout';
const queryUrl = 'https://data.' + clusterName + '.hasura-app.io/v1/query';

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
export async function trySignup(username, email, password, code, mobile, currency) {
    console.log('Making signup query');
    console.log(email);
    console.log(password);
    console.log(code);
    console.log(mobile);
    console.log(currency);
    let requestOptions = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json',
        },
    };
    let body = {
        'provider': 'username',
        'data': {
            'username': username,
            'password': password,
            'email': email,
            'mobile': mobile,
            'currency': currency,
        },
    };

    requestOptions['body'] = JSON.stringify(body);
    console.log('---------------------Auth response -----------------------');

    try {
        let resp = await fetch(signupUrl, requestOptions);
        console.log(resp);
        let responseJson = await resp.json();
        console.log(responseJson);
        return resp;
    } catch (e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function tryLogin(username, password) {
    console.log('Make login query');
    let requestOptions = {
        'method': 'POST',
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    let body = {
        'provider': 'username',
        'data': {
            'username': username,
            'password': password
        }
    };

    requestOptions['body'] = JSON.stringify(body);
    console.log("-------------------Auth Response-----------------");
    try {
        let resp = await fetch(loginUrl, requestOptions);
        console.log(resp);
        return resp;
    }
    catch(e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}

export async function tryLogout(authkey) {
    console.log("Make Logout query");
    authkey = authkey.replace(/^"(.*)"$/, '$1');
    let authorization = "Bearer ".concat(authkey);
    console.log(authorization);
    let requestOptions = {
        'method': 'POST',
        'headers' : {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    };
    console.log(authkey);
    console.log('-----------------Logout Response--------------------');
    try{
        let resp = await fetch(logoutUrl, requestOptions);
        console.log(resp);
        return resp;
    }
    catch(e) {
        console.log("Request Failed: " + e);
        return networkErrorObj;
    }
}

