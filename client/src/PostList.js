/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from "react";
import CommentCreate from "./CommentCreate";
import axios from 'axios'
import CommentList from "./CommentList";

export default ()=>{
    const [posts, setPosts] = useState({});

    const fetecPosts = async ()=>{
        const res = axios.get('http://localhost:4000/post');
        setPosts((await res).data);
    };
    useEffect(()=>{
        fetecPosts();
    },[])
    const renderedPosts = Object.values(posts).map(post=>{
        return <div className="card" style={{width:'30%', marginBottom:'20px' }} key={post.id}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommentList postId={post.id}/>
                <CommentCreate postId={post.id} />
            </div>
        </div>
    })

    return <div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>
} 