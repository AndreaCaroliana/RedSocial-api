import { model, Model, Schema } from "mongoose";
import User from "../interfaces/user.interface";

const userSchema: Schema=new Schema<User>({
    username: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required: true}
})

const user: Model<User>=model('users',userSchema);

export default user;