import { Schema, SchemaTypes, model } from "mongoose";

const commentSchema = new Schema({
    original_postid: String,
    commentid: String,
    username: String,
    name: String,
    date: String,
    text: String
});

const Comment = model('Comment', commentSchema);

export default Comment;