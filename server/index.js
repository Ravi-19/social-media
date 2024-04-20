const express = require('express') ; 
const dotenv = require('dotenv') ; 
const dbConnect = require('./db/dbConncet'); 
const morgan = require('morgan') ; 
const mainRouter = require('./routers/index') ; 
const cookieParser = require('cookie-parser') ; 
const cors = require ('cors');

dotenv.config('./.env') ; 
const app = express() ; 

// middleware 
app.use(express.json()) ; 
app.use(morgan())  ;
app.use(cookieParser()) ; 
app.use(cors({
    credentials:true , 
    origin:'http://localhost:5173'
}) )  ; 


//this api testing purpose 
app.get('/' , (req , res) => {
    res.status(200).send("server is working well , this is home page "); 
})

app.use('/api' , mainRouter)  ; 

const PORT  = process.env.PORT|| 4000 ; 

dbConnect() ; 
app.listen(PORT , () => {
    console.log(`server is listening on ${PORT}`) ; 

})

