import { Schema, SchemaTypes, model } from "mongoose";

const credSchema = new Schema({
    email: String,
    password: String,
    username: String
});

const Credential = model('Credential', credSchema);

export default Credential;