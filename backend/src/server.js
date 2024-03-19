const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connect_database");
const initRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "PUT", "POST", "DELETE"],
        credentials: true
    }
));


connectDB();
initRoutes(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT);
});