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
projects=db.projects
hardware = db.hardware

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
   # nameList = {"admin": "password"}
    returnValue = ""
    user = users.find_one({'username': username, 'password': password})
    if user:
        returnValue = "Success"
    else:
        returnValue = "Invalid username or password"

    print(returnValue)
    return json.dumps({'response':returnValue})

@app.route("/join/", methods=["POST"])
def join():
    data = request.json
    global pid
    pid = data['projectId']
    print(pid)
    return '1'

@app.route("/checkProjectId/", methods=["GET"])
def checkProjectId():
    returnValue = ""
    print(pid)
    project = projects.find_one({'projectid': pid})
    if project:
        returnValue = "Success"
        users.update_one({'username': username}, { "$push": {'resources': pid}})
    else:
        returnValue = "Not created yet"

    print(returnValue)
    return json.dumps({'response':returnValue})


@app.route("/getprojects/", methods=["GET"])
def getProject():
    projects = users.find_one({'username':username},
                             {'resources': 1})['resources']

    return json.dumps({'response':projects})
    query = {}  # Empty query to retrieve all documents
    projection = {"quantity": 1}  # Include only the "Availability" field
    result = hardware.find(query, projection)
    hardware1quant = result[0]["quantity"]
    hardware2quant = result[1]["quantity"]
    projection = {"capacity": 1}  # Include only the "Availability" field
    result = hardware.find(query, projection)
    hardware1cap = result[0]["capacity"]
    hardware2cap = result[1]["capacity"]
    print(hardware1quant)
    return json.dumps({'response':projects, 'hardware1quant':hardware1quant, 'hardware1cap':hardware1cap, 'hardware2quant':hardware2quant, 'hardware2cap':hardware2cap})

@app.route('/checkin/<int:projectId>/<int:qty>/<int:type>', methods=['GET'])
def checkIn_hardware(projectId, qty, type):
    query = {}  # Empty query to retrieve all documents
    projection = {"quantity": 1}  # Include only the "Availability" field
    result = hardware.find(query, projection)
    hardware1quant = result[0]["quantity"]
    hardware2quant = result[1]["quantity"]
    projection = {"capacity": 1}  # Include only the "Availability" field
    result = hardware.find(query, projection)
    hardware1cap = result[0]["capacity"]
    hardware2cap = result[1]["capacity"]    
    if type == 1:
        if (hardware1quant + qty) < hardware1cap:
            hardware.update_one({'name': 'hardwareset1'}, { "$inc": {'quantity': qty}})
        elif (hardware1quant + qty) >= hardware1cap:
            hardware.update_one({'name': 'hardwareset1'}, { "$set": {'quantity': hardware1cap}})
    elif type == 2:
        if (hardware2quant + qty) < hardware2cap:
            hardware.update_one({'name': 'hardwareset2'}, { "$inc": {'quantity': qty}})
        elif (hardware1quant + qty) >= hardware2cap:
            hardware.update_one({'name': 'hardwareset2'}, { "$set": {'quantity': hardware2cap}})
    return json.dumps({'checkedin': 1})

@app.route('/checkout/<int:projectId>/<int:qty>/<int:type>', methods=['GET'])
def checkOut_hardware(projectId, qty, type):
    query = {}  # Empty query to retrieve all documents
    projection = {"quantity": 1}  # Include only the "Availability" field
    result = hardware.find(query, projection)
    hardware1quant = result[0]["quantity"]
    hardware2quant = result[1]["quantity"]
    projection = {"capacity": 1}  # Include only the "Availability" field
    result = hardware.find(query, projection)
    hardware1cap = result[0]["capacity"]
    hardware2cap = result[1]["capacity"]    
    if type == 1:
        if (hardware1quant - qty) > 0:
            hardware.update_one({'name': 'hardwareset1'}, { "$set": {'quantity': (hardware1quant - qty)}})
        elif (hardware1quant + qty) <= 0:
            hardware.update_one({'name': 'hardwareset1'}, { "$set": {'quantity': 0}})
    elif type == 2:
        if (hardware2quant - qty) > 0:
            hardware.update_one({'name': 'hardwareset2'}, { "$set": {'quantity': (hardware2quant - qty)}})
        elif (hardware1quant -qty) <= 0:
            hardware.update_one({'name': 'hardwareset2'}, { "$set": {'quantity': 0}})
    return json.dumps({'checkedout': 1})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5000)