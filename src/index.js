import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import app from "./app.js"
import connectDB from "./db/db.js"



const port =process.env.PORT || 3000
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error)
    process.exit(1)
  })


// app.listen(port ,() =>{
//     console.log(`listening on port http://localhost:${port}`)
// })
// let username=process.env.username
// console.log(username)
// console.log("this is  starting of backend project")


//.env is a file that is used to store all the sensitive content of the project like credentials related to the project 
// we import this dot env file in the index file where all the credentials are injected with the help of process.env that is not visible to the user
//acutally client transfers request to the server and also all the critical info is not there inside the server so server requests someeone

//public folder
//src folder for all logic
//controllers main logic part
//db for managing the database
//middlewares for performing all the operation for connectivity between server and client
//models different types of models to be used
//routes defining all the controls
//utils componenets or something that can be reused
//validators 
//express is a framework of node js that is used for creatingserver side aplications and it connects to mongodb with the help of mongoose , it is lightweightedd and also prevents from setting up those huge routes


// Browser
//    ↓
// HTTP GET /Instagram
//    ↓
// Express server (app)
//    ↓
// Route match found
//    ↓
// Callback executed
//    ↓
// res.send()
//    ↓
// Response sent to browser


//postman api is a fake frontend structure that is used to test the api in the project meant for api development and testing

//cors is a middleware that helps frontend to connect to backend , basically it send those http headers where browsers or clients are told which domain is permitted
//which frontend originn is allowed to access to our backend server is configured with the help of cors
//if postman works but browser fails then prblem is with cors
//apierror and apiresponse are the files taht decide how your backend talks to the outside world .this helps the easy integration of frontend and backend application 
//A constants file centralizes immutable values, prevents hard-coding errors, improves readability, and makes large codebases easier to maintain and scale.
//ODM maps databases documnets too js objects and enforce rules on them
//moongoose is an ODM that acts as a translator between mongo db and node and makes things much more simple
//moongoose is schema focussed meaning with lesser bugs and erros and maintaining data consistency
//js is asynchronus by default that means it does not wait for the function to run instead it continues with the rest of the apppliaction and comes back to the function when the task is completed
//aysnc and await are used to make sure that a function would return a promise in future async is applied on the funtion and await acutally is used to return the promises

//for various applications like aws and deplyment tools , to enable them to know whether our backend is alive or not we make use of health check api


// index.js
//    ↓
// app.js
//    ↓
// routes
//    ↓
// controller
//    ↓
// utils (ApiResponse)
//    ↓
// res.json()
//    ↓
// CLIENT
