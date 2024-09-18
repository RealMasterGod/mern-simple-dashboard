# Instructions to run locally
0. NOTE: You need to have node and npm installed to run this site.
1. Clone this repo and then open terminal in working directory
2. First go to api folder, there create a .env file. I have used mongodb as database so you must use your mongodb atlas connection string to
   run this software. Create an account on mongodb atlas if you don't have it already. Now in .env file just create a env variable MONGODB_URI and assign it to
   your connection string. The code would then look something like this (you will have to put your username and password in your connection string and also give your
   collection a name - I have given it ghackk)
   ```bash
   MONGODB_URI = mongodb+srv://<username>:<password>@cluster0.nornfun.mongodb.net/ghackk?retryWrites=true&w=majority&appName=Cluster0
   ```
3. Also note that since this software was meant to run locally, I have not used aws or firebase for image upload and instead have used multer
   so all images/documents will be saved on your machine inside api/public/uploads folder
4. Once done with the .env, you can now run the api. Go to terminal and change directory to api if you are not in it.
   Now type this command and press enter:
   ```bash
   npm install && npm start
   ```
5. Now change directory to client folder. Run the following command:
   ```bash
   npm install && npm run dev
   ```
6. The site should be running on localhost:5173 or whatever url it is showing in console.

If you have any questions feel free to reach out to me.

# Technologies used

## React + Vite
You can create a react vite app by using the command below:
```bash
npm create vite@latest appname -- --template react
```
Learn more about vite: https://vitejs.dev/guide/
Note: you need npm and node installed in your system. Refer to this to install: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

## Redux Toolkit

A powerful state management library. It makes state changes really easy and efficient.
Learn more about redux: https://redux-toolkit.js.org/introduction/getting-started
To use redux in your project, run these commands
```bash
npm i react-redux @reduxjs/toolkit
```

## Node and Express.js
Node is a run time environment that helps developers run javascript on server side.
Express is a framework which is built on top of node.js . It is a great tool to make rest apis faster. It doesn't follow any structure (though there are always best practices that we should follow) and hence is unopinionated.
To use express in your code run this code:
```bash
npm i express
```
Learn more about express: https://expressjs.com/
Learn more about nodejs: https://nodejs.org/en

## Mongodb Database
This is NOSQL database which has great cloud connectivity so you can access it anywhere as long as you have network connection.
To install mongodb in your project, run this:
```bash
npm i mongoose
```
