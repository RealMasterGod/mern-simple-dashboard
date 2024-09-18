# Instructions to run locally
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
