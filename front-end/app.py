from flask import Flask, send_from_directory,request,json
from flask_cors import CORS
import json
import pymongo
import os

app = Flask(__name__, static_folder='./build', static_url_path='/')
CORS(app)

global firstNameInput

myclient = pymongo.MongoClient("mongodb+srv://ktvu2002:12345@cluster0.yjoiobi.mongodb.net/")

db = myclient.swelab
users = db.users
projects=db.projects
hardware = db.hardware

def encrypt(inputText, N, D):
    N = N*D
    reversed = inputText[::-1]
    print(reversed)
    encrypted = ""
    index = 0
    for x in reversed:
        match x:
            case ' ':
                encrypted += ' '
            case '!':
                encrypted += '!'
            case _:
                if D == 1:
                    x = chr((ord(x) + N - 34) % 93 + 34)
                    encrypted += x   
                elif D == -1:
                    x = chr((ord(x) + N - 34) % 93 + 34)
                    encrypted += x      
    return encrypted

def decrypt(inputText, N, D):
    N = N*-D
    reversed = inputText[::-1]
    decrypted = ""
    for x in reversed:
        match x:
            case ' ':
                decrypted += ' '
            case '!':
                decrypted += '!'
            case _:
                
                x = chr(ord(x) + N)
                decrypted += x  
    return decrypted

@app.route("/", methods=["GET"])
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/logoff/", methods=["GET"])
def logoff():
    username=''
    userid=''
    password=''

@app.route("/login/", methods=["POST"])
def getter_login():
    print('post request working')
    data = request.json
    global username
    global userid
    global password
    username=''
    userid=''
    password=''
    #username = data['username']
    userid = data['userid']
    password = data['password']
    print(username, password)
    return '1'

@app.route("/login2/", methods=["POST"])
def getter_login2():
    print('post request working')
    data = request.json
    global username
    global userid
    global password
    username=''
    userid=''
    password=''
    username = data['username']
    userid = data['userid']
    password = data['password']
    print(username, password)
    return '1'

@app.route("/createProj/", methods=["GET"])
def createProj():
    returnValue = ""
    print(pid)
    project = projects.find_one({'projectid': int(pid)})
    if pid=="" or desc=="":
        returnValue="Please enter all fields"   
    elif project:
        returnValue = "Project already exists"
    else:
        returnValue = "Project created"
        new={"projectid": int(pid), "hw": [0,0],"description":desc}
        projects.insert_one(new)

    print(returnValue)
    return json.dumps({'response':returnValue})


@app.route("/credentials/", methods=["GET"])
def lastName():
    print('GET request working')
   # nameList = {"admin": "password"}
    returnValue = ""
    user = users.find_one({'userid': userid})
    if user and (password == decrypt(user['password'], 3, 1)):
        returnValue = "Success"
    else:
        returnValue = "Invalid userid or password"

    print(returnValue)
    return json.dumps({'response':returnValue})

@app.route("/join/", methods=["POST"])
def join():
    data = request.json
    global pid
    pid=0
    desc=''
    pid = data['projectId']
    print(pid)
    return '1'

@app.route("/join2/", methods=["POST"])
def join2():
    data = request.json
    global pid
    global desc
    pid=0
    desc=''
    pid = data['projectId']
    desc = data['description']
    desc=desc[:14]
    return '1'

@app.route("/checkProjectId/", methods=["GET"])
def checkProjectId():
    returnValue = ""
    print(pid)
    user = users.find_one({'userid': userid})
    
    project = projects.find_one({'projectid': int(pid)})
    if project:
        returnValue = "Success"
        if int(pid) in user['resources']:
            returnValue = "Already joined"
        else:
            users.update_one({'userid': userid}, { "$push": {'resources': int(pid)}})
    else:
        returnValue = "Project does not exist"

    print(returnValue)
    return json.dumps({'response':returnValue})

@app.route("/createAccount/", methods=["GET"])
def createAccount():
 
    returnValue = ""
    if username=="" or userid=="" or password=="":
        returnValue="Please enter all fields"
    else:
       user = users.find_one({'userid': userid})
       if user:
         returnValue = "Userid already exists"
       else:    
         new={"userid": userid,"username": username, "password": encrypt(password, 3, 1), "resources":[]}
         users.insert_one(new)
         returnValue = "Success"

    print(returnValue)
    return json.dumps({'response':returnValue})



@app.route("/getprojects/", methods=["GET"])
def getProject():
    allprojects = users.find_one({'userid':userid},
                             {'resources': 1})['resources']
    names = []
    for x in allprojects:
        project = projects.find_one({'projectid': x})
        names.append(project['description'])
    print(names)
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
    return json.dumps({'response':allprojects, 'hardware1quant':hardware1quant, 'hardware1cap':hardware1cap, 'hardware2quant':hardware2quant, 'hardware2cap':hardware2cap, 'names':names})

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
    projection = {"projectid": projectId}  # Include only the "Availability" field
    result = projects.find_one({'projectid': projectId})
    print(result)
    hw1checkedOut = result['hw'][0]
    hw2checkedOut = result['hw'][1]
    if type == 1:
        if(qty >= hw1checkedOut):
            hardware.update_one({'name': 'hardwareset1'}, { "$inc": {'quantity': hw1checkedOut}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.0': -hw1checkedOut}})
            # print(result)
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware1quant = result[0]["quantity"]
            projection = {"projectid": projectId}  # Include only the "Availability" field
            result = projects.find_one({'projectid': projectId})
            hw1checkedOut = result['hw'][0]
            
            return json.dumps({'checkedin': hardware1quant, 'number': hw1checkedOut})
        else:
            hardware.update_one({'name': 'hardwareset1'}, { "$inc": {'quantity': qty}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.0': (-qty)}})
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware1quant = result[0]["quantity"]
            projection = {"projectid": projectId}  # Include only the "Availability" field
            result = projects.find_one({'projectid': projectId})
            hw1checkedOut = result['hw'][0]
            
            return json.dumps({'checkedin': hardware1quant, 'number': hw1checkedOut})  
    elif type == 2:
        # if(qty + hardware2quant >= hardware2cap):
        #     hardware.update_one({'name': 'hardwareset2'}, { "$set": {'quantity': hardware1cap}})
        #     projects.update_one({'projectid': projectId}, { "$set": {'hw.0': 0}})
        #     projection = {"quantity": 1}  # Include only the "Availability" field
        #     result = hardware.find(query, projection)
        #     return json.dumps({'checkedin': result[1]["quantity"]})
        # else:
        #     hardware.update_one({'name': 'hardwareset2'}, { "$inc": {'quantity': qty}})
        #     projects.update_one({'projectid': projectId}, { "$set": {'hw.0': (hardware2quant-qty)}})
        #     projection = {"quantity": 1}  # Include only the "Availability" field
        #     result = hardware.find(query, projection)
        #     return json.dumps({'checkedin': result[0]["quantity"]})
        if(qty >= hw2checkedOut):
            hardware.update_one({'name': 'hardwareset2'}, { "$inc": {'quantity': hw2checkedOut}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.1': -hw2checkedOut}})
            # print(result)
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware2quant = result[1]["quantity"]
            projection = {"projectid": projectId}  # Include only the "Availability" field
            result = projects.find_one({'projectid': projectId})
            hw2checkedOut = result['hw'][1]
            
            return json.dumps({'checkedin': hardware2quant, 'number': hw2checkedOut})
        else:
            hardware.update_one({'name': 'hardwareset2'}, { "$inc": {'quantity': qty}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.1': (-qty)}})
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware2quant = result[1]["quantity"]
            projection = {"projectid": projectId}  # Include only the "Availability" field
            result = projects.find_one({'projectid': projectId})
            hw2checkedOut = result['hw'][1]

            return json.dumps({'checkedin': hardware2quant, 'number': hw2checkedOut})   
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
    projection = {"projectid": projectId}  # Include only the "Availability" field
    result = projects.find_one({'projectid': projectId})
    print(result)
    hw1checkedOut = result['hw'][0]
    hw2checkedOut = result['hw'][1]  
    if type == 1:
        if (hw1checkedOut + qty) >= hardware1quant:
            hardware.update_one({'name': 'hardwareset1'}, { "$inc": {'quantity': (-hardware1quant)}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.0': hardware1quant}})
            # print(result)
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware1quant = result[0]["quantity"]
            projection = {"projectid": projectId}
            result = projects.find_one({'projectid': projectId})
            hw1checkedOut = result['hw'][0]
            return json.dumps({'checkedout': hardware1quant, "number": hw1checkedOut})
        elif (hw1checkedOut + qty) <= hardware1quant:
            hardware.update_one({'name': 'hardwareset1'}, { "$inc": {'quantity': -qty}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.0': qty}})
            # print(result)
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware1quant = result[0]["quantity"]
            projection = {"projectid": projectId}
            result = projects.find_one({'projectid': projectId})
            hw1checkedOut = result['hw'][0]
            return json.dumps({'checkedout': hardware1quant, 'number': hw1checkedOut})
    elif type == 2:
        if (hw2checkedOut + qty) >= hardware2quant:
            hardware.update_one({'name': 'hardwareset2'}, { "$inc": {'quantity': (-hardware2quant)}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.1': hardware2quant}})
            # print(result)
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware2quant = result[1]["quantity"]
            projection = {"projectid": projectId}  # Include only the "Availability" field
            result = projects.find_one({'projectid': projectId})
            hw2checkedOut = result['hw'][1]
            return json.dumps({'checkedout': hardware2quant, 'number': hw2checkedOut})
        elif (hw2checkedOut + qty) <= hardware2quant:
            hardware.update_one({'name': 'hardwareset2'}, { "$inc": {'quantity': -qty}})
            projects.update_one({'projectid': projectId}, { "$inc": {'hw.1': qty}})
            # print(result)
            projection = {"quantity": 1}  # Include only the "Availability" field
            result = hardware.find(query, projection)
            hardware2quant = result[1]["quantity"]
            projection = {"projectid": projectId}  # Include only the "Availability" field
            result = projects.find_one({'projectid': projectId})
            hw2checkedOut = result['hw'][1]
            return json.dumps({'checkedout': hardware2quant, 'number': hw2checkedOut})
    return json.dumps({'checkedout': 1})

if __name__ == '__main__':
    #app.run(host='0.0.0.0', debug=False, port=5000)
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))