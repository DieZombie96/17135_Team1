from flask import Flask, send_from_directory,request,json
from flask_cors import CORS
import json
import pymongo

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

global firstNameInput

myclient = pymongo.MongoClient("mongodb+srv://ktvu2002:12345@cluster0.yjoiobi.mongodb.net/")

db = myclient.swelab
users = db.users

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/login/", methods=["POST"])
def getter_login():
    print('post request working')
    data = request.json
    global username
    global userid
    global password
    username = data['username']
    # userid = data['userid']
    password = data['password']
    print(username, password)
    return '1'

@app.route("/credentials/", methods=["GET"])
def lastName():
    print('GET request working')
    nameList = {"admin": "password"}
    returnValue = ""

    print('GET request working')
 #   nameList = {"admin": "password"}
    returnValue = ""
    user = users.find_one({'username': username, 'password': password})
    if user:
        returnValue = "Success"
    else:
        returnValue = "Invalid username or password"

    # for usernames in nameList:
    #     if (username == usernames):
    #         returnValue = "Success"
    #     else:
    #         returnValue = "Invalid username or password"
    print(returnValue)
    return json.dumps({'response':returnValue})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5000)