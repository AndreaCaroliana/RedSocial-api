import { FastifyReply, FastifyRequest } from "fastify";
import { CustomRequest } from "../types/tweet.type";
import tweets from "../models/tweets.model";
class Whisper{
    public async newTweet(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const {username, tweet} = request.body;
        const user= await await tweets.findOneAndUpdate({username}, {$push:{tweets: tweet}});
        if(user === null) return {msg: "User cant be found"}
        else{
            return {msg: 'tweet guardado', user}
        }
    }
    public async getTweets(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const username = request.query.username;
        const user= await tweets.findOne({username});
        if(user === null) return {msg: "User cant be found"}
        else{
            return {tweets: user.tweets};
        }
    }
}

export const whisper= new Whisper();