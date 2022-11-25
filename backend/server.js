const dotevn = require("dotenv").config();
const express = require("express");
const {errorHandler} = require("./middleware/errorMiddleware")
const port = process.env.PORT;
const mongoose = require("mongoose");

const app = express();

//Middleware:
app.use(express.json());

app.use(errorHandler);

app.use("/api/", require("./routes/tickets"))
app.use("/api/users", require("./routes/users"))


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(port, () => console.log(`Connected to the database and my server is running in port ${port}`));
    })
    .catch((error) => {
        console.log(error)
    })


