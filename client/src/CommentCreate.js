/* eslint-disable import/no-anonymous-default-export */
import React,{useState} from "react";
import axios from 'axios';

export default ({postId})=>{
    const [content , setcontent]= useState('');
    const onSubmit = async(e)=>{
        e.preventDefault();
        await axios.post(`http://localhost:4001/post/${postId}/comments`,{
            content
        });
        setcontent('');

    }
    return <div>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>New Comment</label>
                <input value={content} onChange={e => setcontent(e.target.value)} className="form-control"></input>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}