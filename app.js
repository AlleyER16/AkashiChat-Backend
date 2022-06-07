require("express-async-errors");
require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.static("./public/"));

app.use(express.json()); // For parsing request body

app.get("/api/", (req, res) => {
    res.json({message: "Hello world"});
});

const {
    users_router
} = require("./routers");

app.use("/api/users", users_router);

const connectDB = require("./database");

const port = process.env.PORT || 3000

const start = async () => {

    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`App listening at port ${port}, http://localhost:${port}/`);
        });
    }catch(err){
        console.log(err);
    }

}

start();