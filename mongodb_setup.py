import pymongo
import ssl


myclient = pymongo.MongoClient("mongodb+srv://ktvu2002:12345@cluster0.yjoiobi.mongodb.net/")




db = myclient.swelab
users = db.users


personDocument = {
  "name": { "first": "Abhay", "last": "Samant" },
  "username": "a123",
  "password": "123",
  "resources": ["class1", "class2"]
}
 
#users.insert_one(personDocument)
myquery={"name.first":"Abhay"}
x=users.find_one(myquery)
print(x)
if(x['name']=={'first': 'Abhay', 'last': 'Samant'}):
    print("Name found\n")
else:
    print("Name not found\n")


