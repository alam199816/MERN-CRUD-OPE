let express = require("express");
let mongoose = require("mongoose");
let cors = require('cors');
const enquiryRouter = require("./App/routes/web/enquiryRoutes");
require("dotenv").config();
let app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/website/enquiry",enquiryRouter);
 
//connect to mongodb
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("DBURL from .env:", process.env.DBURL);
    app.listen(process.env.PORT || 3000,()=>{
        console.log("server is running on port",process.env.PORT);
    });
}).catch((err)=>{
    console.log("error connecting to mongodb",err);
})
