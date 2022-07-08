import { model, Model, Schema } from "mongoose";
import User, { SocialUser } from "../interfaces/user.interface";



const socialUserSchema=new Schema<SocialUser>({
    username: {type: String, required:true},
    followers: [{type: String}],
    follows: [{type: String}]
})

const userSchema: Schema=new Schema<User>({
    username: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required: true},
    name:{type: String},
    location:{type: String},
    birthday:{type: Date},
    bio:{type: String}
})

const user: Model<User>=model('users',userSchema);

export const socialUser: Model<SocialUser>=model('social_user',socialUserSchema);

export default user;