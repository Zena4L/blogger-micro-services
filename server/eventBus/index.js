const express = require('express')
const axios = require('axios');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.post('/events',(req,res)=>{
    const event = req.body;

    axios.post('http://localhost:4000/events',event);
    axios.post('http://localhost:4001/events',event);
    axios.post('http://localhost:4002/events',event);

    res.send({status:'Ok'});
})

server.listen(4005,()=>{
    console.log('server is live on 4005')
})