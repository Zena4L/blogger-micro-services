const express = require('express');
const http = require('http');
const {randomBytes} = require('crypto');
const cors = require('cors');

// const bodyParser = require('body-parser')


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors())
const posts = {};

app.get('/post',(req,res)=>{
    res.send(posts); 
});

app.post('/post',(req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id,title
    };
    res.status(201).send(posts[id])
});

server.listen(4000,()=>{
    console.log('server is live on 4000')
})