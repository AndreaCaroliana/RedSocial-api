import { model, Model, Schema } from "mongoose";
import Tweets from "../interfaces/tweets.interface";


const userSchema: Schema=new Schema<Tweets>({
    username: {type: String, required:true},
    tweets: [{type: String}]
})

const tweets: Model<Tweets>=model('tweets',userSchema);

export default tweets;