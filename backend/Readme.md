## 1.npm init -y
## 2.npm i express@4
## 3.node --watch server.js
## 4.npm i dotenv
## 5.open mongodb and add new connection
## 6.write this in server.js
``
require('dotenv').config()
console.log(process.env.MONGO_URI);
``
## 7.copy the connection string and paste it in .env file that helps in accessing the data in which ever device we want 
## 8.use MongoDb nodejs driver from docs 

# refering to this docs the whole time for all the code and reference