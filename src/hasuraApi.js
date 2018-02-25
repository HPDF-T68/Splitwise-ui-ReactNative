const loginUrl = 'https://app.octagon58.hasura-app.io/login';
const signupUrl = 'https://app.octagon58.hasura-app.io/signup';
const queryDetails = 'https://app.octagon58.hasura-app.io/info';
const logoutUrl = 'https://auth.octagon58.hasura-app.io/v1/user/logout';
const queryUrlAddMoney = 'https://app.octagon58.hasura-app.io/add_money_account';
const queryFriendList = 'https://app.octagon58.hasura-app.io/list_friend';

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

export async function getUserDetails(authkey) {
    console.log('Make user detail query');
    authkey = authkey.replace(/^"(.*)"$/, '$1');
    let authorization = "Bearer ".concat(authkey);
    console.log(authorization);
    let requestOptions = {
        'method': 'POST',
        'headers' : {
            'Content-Type': 'application/json',
        }
    };
    let body = {
        "data": {
		    "Authorization": authorization,
	    }
    };
    requestOptions["body"] = JSON.stringify(body);
    try {
        let resp = await fetch(queryDetails, requestOptions);
        return resp;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function tryAddMoney(uid,amount) {
    console.log('Make add money query');
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    let body = {
        "data":{
            "uid":uid,
            "money":amount
        }
    };
    requestOptions["body"] = JSON.stringify(body);
    try {
        let resp = await fetch(queryUrlAddMoney, requestOptions);
        return resp;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function getFriendList(uid) {
    console.log('Make friend list query');
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    
    let body = {
        "data": {
            "uid": uid
        }
    };
    
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(queryFriendList, requestOptions);
        return resp;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

