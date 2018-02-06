from flask import Flask
import requests
import json

from urllib3 import request

app = Flask(__name__)


@app.route('/signup/<uuid>', methods=['GET', 'POST'])
def add_message(uuid):
    content = request.get_json(silent=True)
    # This is the url to which the query is made

    js = json.loads(content)

    # This is the url to which the query is made

    url = "https://auth.antipoverty56.hasura-app.io/v1/signup"
    # This is the json payload for the query
    requestPayload = {
        "provider": "username",
        "data": {
            "username": js['username'],
            "password": js['password']
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print resp.content
    if resp['message']=="This user already exists":
        return "Null"
    else:
        url = "https://data.antipoverty56.hasura-app.io/v1/query"

    # This is the json payload for the query
        requestPayload = {
        "type": "insert",
        "args": {
            "table": "Registration",
            "objects": [
                {
                    "Name": js['username'],
                    "Email": js['email'],
                    "Password": js['password'],
                    "Mobile": js['mobile'],
                    "Currency": js['Currency']
                }
            ]
        }
        }

    # Setting headers
        headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer c8b3b2d8d33fd68c20ab6afa83028ad2806b241ea70d8fed"
        }

    # Make the query and store response in resp
        resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
        print resp.content
        return resp.content

app.run(debug=True)
