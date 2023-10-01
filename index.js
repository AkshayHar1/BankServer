require('dotenv').config();

//imppot express
const express=require('express')
const cors=require('cors')
const router=require('./routes/router') //import route

//creating a server 
const server=express();

server.use(express.json())
server.use(cors())
server.use(router) //server set

//integrate front-end


  


require('./db/connection')

//port 
const port=5001 || process.env.port

server.listen(port,()=>{console.log(`server running at ${port}....`);})

// server.post('/reg',(req,res)=>{
//     console.log(req.body.pass)
//     res.send('post.....')
// })
