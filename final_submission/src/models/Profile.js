import { Schema, SchemaTypes, model } from "mongoose";

const profileSchema = new Schema({
    username: String,
    name: String,
    bio: String
});

const Profile = model('Profile', profileSchema);

export default Profile;