const loginUrl = 'https://app.octagon58.hasura-app.io/login';
const signupUrl = 'https://app.octagon58.hasura-app.io/signup';
const queryDetails = 'https://app.octagon58.hasura-app.io/info';
const logoutUrl = 'https://auth.octagon58.hasura-app.io/v1/user/logout';
const dataUrl = 'https://data.octagon58.hasura-app.io/v1/query';
const queryUrlAddMoney = 'https://app.octagon58.hasura-app.io/add_money_account';
const queryFriendList = 'https://app.octagon58.hasura-app.io/list_friend';
const queryFriendAdd = 'https://app.octagon58.hasura-app.io/add_friend';
const queryGroupAdd = 'https://app.octagon58.hasura-app.io/create_group';

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

export async function AddFriendApi(uid, friend_id) {
    console.log('Make friend Add query');
    console.log(uid);
    console.log(friend_id);
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        }
    };
    
    let body = {
        "data": {
            "uid": uid,
            "friend_id": friend_id
        }
    };
    
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(queryFriendAdd, requestOptions);
        console.log(resp);
        return resp;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function RemoveFriendApi(uid, friend_id) {
    console.log('Make friend remove query');
    console.log(uid);
    console.log(friend_id);
    let requestOptions = {
        "method": "POST",
        "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
    }
    };
    
    let body = {
        "type": "delete",
        "args": {
            "table": "friend",
            "where": {
                "$and": [
                    {
                        "uid": {
                            "$eq": uid
                        }
                    },
                    {
                        "friend_id": {
                            "$eq": friend_id
                        }
                    }
                ]
            }
        }
    };
    
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        console.log(resp);
        return resp;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function getGroupList(uid) {
    console.log('Make group list query');
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
        }
    };

    let body= {
        "type": "select",
        "args": {
            "table": "group_member",
            "columns": [
                "gid"
            ],
            "where": {
                "uid": {
                    "$eq": uid
                }
            }
        }
    };
    
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        let responseGid = await resp.json();
        console.log(responseGid);
        let length = Object.keys(responseGid).length;
        console.log(length);
        let i = 0;
        let responseOne = [];
        while(length > 0) {
            let body = {
                "type": "select",
                "args": {
                    "table": "group",
                    "columns": [
                        "gid",
                        "gname",
                        "gdate",
                        "member_no",
                        "total_expanse"
                    ],
                    "where": {
                        "gid": {
                            "$eq": responseGid[i].gid
                        }
                    }
                }
            };
            requestOptions.body = JSON.stringify(body);
            let resp = await fetch(dataUrl, requestOptions);
            responseOne = responseOne.concat(await resp.json());
            i++;
            length--;
        }
        return responseOne;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function tryAddGroup(uid,gname,members) {
    console.log("Make add group query");
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    }
    let today = yyyy+'-'+mm+'-'+dd;
    let length = members.length;
    console.log(today);
    console.log(length);
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
        }
    };

    let body = {
        "type": "insert",
        "args": {
            "table": "group",
            "objects": [
                {
                    "gname": gname,
                    "member_no": length,
                    "uid": uid,
                    "gdate": today
                }
            ],
            "returning": [
                "gid"
            ]
        }
    };
        
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        let responseJson = await resp.json();
        let reGig = responseJson.returning[0].gid;
        console.log("GROUP USER table details");
        console.log(reGig);
        console.log(gname);
        console.log(members);
        let i = 0;
        console.log(reGig)
        while(length > 0){
            console.log('Adding one user in group user table')
            let body = {
                "type": "insert",
                "args": {
                    "table": "group_member",
                    "objects": [
                        {
                            "gid": reGig,
                            "uid": members[i],
                            "gname": gname,
                        }
                    ]
                }
            };
            requestOptions.body = JSON.stringify(body);
            try{
                let resp = await fetch(dataUrl, requestOptions);
                console.log(resp);
            }
            catch(e) {
                console.log('Request Failed: ' + e);
                break;
            }
            console.log('Adding one user completed');
            i++;
            length--;
        }
        let body = {
            "type": "count",
            "args": {
                "table": "group_member",
                "where": {
                    "gid": {
                        "$eq": reGig
                    }
                }
            }
        };
        requestOptions.body = JSON.stringify(body);
        try{
            let resp = await fetch(dataUrl, requestOptions);
            return resp;
        }catch(e) {
            console.log('Request Failed: ' + e);
            return networkErrorObj;
        }
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function getUserID(username) {
    console.log('Make get user id query');
    console.log("Username" + username);
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
        }
    };
    
    let body = {
        "type": "select",
        "args": {
            "table": "signup",
            "columns": [
                "uid"
            ],
            "where": {
                "username": {
                    "$eq": username
                }
            }
        }
    };
    
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        return resp;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function getGroupUsers(gid) {
    console.log('Make get group users query');
    console.log("Gid" + gid);
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
        }
    };
    
    let body = {
        "type": "select",
        "args": {
            "table": "group_member",
            "columns": [
                "uid",
                "to_pay"
            ],
            "where": {
                "gid": {
                    "$eq": gid
                }
            }
        }
    };
    
    requestOptions.body = JSON.stringify(body);

    try {
        let resp = await fetch(dataUrl, requestOptions);
        let responseUid = await resp.json();
        console.log(responseUid);
        let length = Object.keys(responseUid).length;
        console.log(length);
        let i = 0;
        let responseOne = [];
        while(length > 0){
            let body = {
                "type": "select",
                "args": {
                    "table": "signup",
                    "columns": [
                        "username",
                        "owe",
                        "image_id",
                        "uid"
                    ],
                    "where": {
                        "uid": {
                            "$eq": responseUid[i].uid
                        }
                    }
                }
            };
            requestOptions.body = JSON.stringify(body);
            let resp = await fetch(dataUrl, requestOptions);
            responseOne = responseOne.concat(await resp.json());
            responseOne[i].to_pay = responseUid[i].to_pay;
            i++;
            length--;
        }
        return responseOne;
    }
    catch(e) {
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function addMoneyGroup(gid,uid,amount,samount,notes,length) {
    console.log("Make query for add money");
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
        }
    };
    
    let body = {
        "type": "update",
        "args": {
            "table": "group",
            "where": {
                "gid": {
                    "$eq": gid
                }
            },
            "$set": {
                "total_expanse": amount,
                "group_note": notes
            }
        }
    };
    
    requestOptions.body = JSON.stringify(body);
    try{
        let resp = await fetch(dataUrl, requestOptions);
        let i = 0;
        let j = 0;
        let flag1 = 0;
        let flag2 = 0;
        let count = length;
        while(length > 0){
            let body = {
                "type": "update",
                "args": {
                    "table": "group_member",
                    "where": {
                        "$and": [
                            {
                                "gid": gid
                            },
                            {
                                "uid": uid[i]
                            }
                        ]
                    },
                    "$set": {
                        "to_pay": samount
                    }
                }
            };
            requestOptions.body = JSON.stringify(body);
            let resp = await fetch(dataUrl, requestOptions);
            console.log("Added one row in group member");
            length--;
            i++;
            flag1++;
        }
        while(count > 0){
            let lbody= {
                "type": "update",
                "args": {
                    "table": "signup",
                    "where": {
                        "uid": {
                            "$eq": uid[j]
                        }
                    },
                    "$inc": {
                        "owe": samount
                    }
                }
            }
            requestOptions.body = JSON.stringify(lbody);
            let resp = await fetch(dataUrl, requestOptions)
            console.log("updated one row in signup");
            count--;
            j++;
            flag2++;
        }
        console.log(flag1);
        console.log(flag2);
        return resp;
    }catch(e){
        console.log('Request Failed: ' + e);
        return networkErrorObj;
    }
}

export async function payMoney(gid,uid){
    console.log("Make query for pay money");
    let requestOptions = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer b0640a99283af5dfd4cdf5eb9450684f5f5a902b3a219364"
        }
    };

    let body = {
        
    }
    
}