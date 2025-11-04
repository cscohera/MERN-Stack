Carson Scohera Setup Guide for Running MERN Stack webapp


Database used on mongoDB: "Running"
mongodb://localhost:27017/Running
Collections needed are "runs", "users" and "clubs"

Have three required services to run at same time. Mongo, Node.js/express, and react
All are listed below

Backend
http://localhost:8080/
cd Backend

If .env is inaccessable create a .env file in the frontend directory with these lines 
PORT=8080
MONGO_URI=mongodb://localhost:27017/Running

Way to Run mongoDb on mac
sudo mongod --dbpath ./data/db

Way to run mongoDb on windows
mongod --dbpath ".\data\db"


npm install
npm install cors
npm install dotenv
npm install mongoose

To start the node.js/express then run 
npm run start



Frontend


cd Frontend
http://localhost:5173/
npm install 
npm install react-router
npm install react-hot-toast
npm install bootstrap@5.3.8
npm install axios

To start the react frontend now run
npm run dev


