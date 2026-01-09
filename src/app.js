import express from "express"
import cors from "cors"


const app =express()


app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true, limit : "16kb"}))
app.use(express.static("public"))

app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true ,
    methods : ["GET","PUT","POST","PATCH","DELETE" ,"OPTIONS"],
    allowedHeaders : ["Content-type","Authorization"],
}))

//import routes
import healthcheckRouter from './routes/healthcheck.routes.js'
app.use("/api/v1/healthcheck",healthcheckRouter)

import authrouter from "./routes/auth.route.js"
app.use("/api/v1/auth",authrouter)

app.get("/",(req,res) =>{
     res.send("hello world");
}
);
app.get("/Instagram" , (req,res) =>{
    res.send("this is an instagram  page")
})

export default app;