import { Schema, SchemaTypes, model } from "mongoose";

const credSchema = new Schema({
    username: String,
    email: String,
    password: String,
    handle: String
});

const Credential = model('Credential', credSchema);

export default Credential;