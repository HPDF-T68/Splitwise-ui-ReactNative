const clusterName = 'octagon58';

const loginUrl = 'https://auth.${clusterName}.hasura-app.io/v1/login';
const signupUrl = 'https://auth.'+ clusterName +'.hasura-app.io/v1/signup';
const queryUrl = 'https://data.'+ clusterName +'.hasura-app.io/v1/query'

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
        },
      };

    requestOptions['body']= JSON.stringify(body);
    console.log('---------------------Auth response -----------------------');

    try {
        let resp = await fetch(signupUrl, requestOptions);
        console.log(resp);
        let responseJson = await resp.json();  
        console.log(responseJson);
        let resHasuraid = JSON.stringify(responseJson.hasura_id);
        if(resp.status === 200){
            console.log("Updating signup table initialised");
            requestOptions = {
                'method': 'POST',
                'headers': {
                    'Content-Type': 'application/json'
                },
            };
            body = {
                'type': 'insert',
                'args': {
                    'table': 'signup',
                    'objects': [
                        {
                            'uid': resHasuraid,
                            'email': email,
                            'mobile': mobile,
                            'currency': currency,
                        }
                    ]
                }
            };
            requestOptions['body']= JSON.stringify(body);
            console.log('-------------------Signup table updated response---------------------')
            try{
                let dresp = await fetch(queryUrl, requestOptions);
                console.log(dresp);
                let dresponseJson = await dresp.json();  
                console.log(dresponseJson);
                return dresp;
            }catch(e) {
                console.log('Database update request failed');
                return networkErrorObj;
            }
        }
    } catch (e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

