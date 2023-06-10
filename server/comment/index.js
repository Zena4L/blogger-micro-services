const express = require('express');
const http = require('http');
const {randomBytes} = require('crypto');
const cors = require('cors')
const axios = require('axios');


const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors())

const commentsByPostId = {}
    

app.get('/post/:id/comments', (req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/post/:id/comments',async (req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type:'CommentCreated',
        data:{
            id: commentId,
            content,
            postId: req.params.id,
        }
    })

    res.status(201).send(comments)
});

app.post('/events',(req,res)=>{
    console.log('Recieved Event', req.body.type);
    res.send({});
})

server.listen(4001,()=>{
    console.log('server is live on 4001');
})