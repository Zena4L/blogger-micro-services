const express = require('express')
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/post',(req,res)=>{
    res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type, data} = req.body;
    if(type === 'postCreated'){
        const { id, title} = data;
        posts[id] = {id, title, comments: []};
    }
    
    if(type === 'CommentCreated'){
        const {id, content, postId} = data;
        const post = posts[postId];
        post.comments.push({id, content});

    }
    console.log(posts)
    res.send({});

});

app.listen(4002,()=>{
    console.log('server is live on 4002');
})