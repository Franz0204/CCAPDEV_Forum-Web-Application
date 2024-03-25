import { Schema, SchemaTypes, model } from "mongoose";

const postSchema = new Schema({
    postid: String,
    username: String,
    name: String,
    date: String,
    title: String,
    body: String,
    tags: [String],
    hasImage: Boolean
});

const Post = model('Post', postSchema);

export default Post;