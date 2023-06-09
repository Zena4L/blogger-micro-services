const express = require('express');
const http = require('http');
const {randomBytes} = require('crypto');



const app = express();
const server = http.createServer(app);

app.use(express.json());
const commentsByPostId = {}
    

app.get('/post/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});
app.post('/post/:id/comments',(req,res)=>{
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments)
});

server.listen(4001,()=>{
    console.log('server is live on 4001');
})