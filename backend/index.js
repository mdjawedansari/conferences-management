import express from "express"
import path from "path";
import cors from "cors";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";


dotenv.config()
const app = express()

// mongodb connection 
connectDb()

const __dirname = path.resolve()

// cors

const allowedOrigins = ["http://localhost:8080", "http://localhost:5173"]

// middleware
app.use(cors({
    origin : function (origin , callback) {
        if(!origin) return null, true

        if(allowedOrigins.indexOf === -1){
            const msg = "the cors policy only allow access from specified origins."
            return callback(new Error(msg), false)
        }

        return callback(null , true)
    },

    credentials :true
}))

app.use(express.urlencoded({extended:false , limit : "20kb"}));
app.use(express.json({limit : "20kb"}))
app.use(cookieParser())
app.use(morgan('dev'))


// routes
import AuthRoutes from "./routes/auth.routes.js"


// base Route
app.use("/api/auth", AuthRoutes )



//static file 
app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})


// server

app.listen(process.env.PORT, (req, res) => {
    console.log(`app is running at port : ${process.env.PORT}`)
})
