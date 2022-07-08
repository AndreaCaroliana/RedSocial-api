import { FastifyReply, FastifyRequest } from "fastify";
import { CustomRequest } from "../types/tweet.type";
import tweets from "../models/tweets.model";
class Whisper{
    public async newTweet(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const {username, tweet} = request.body;
        const user= await await tweets.findOneAndUpdate({username}, {$push:{tweets: tweet}});
        if(user === null) return {msg: "User cant be found"}
        else{
            return reply.status(201).send({msg: 'tweet guardado', user})
        }
    }
    public async getTweets(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const username = request.query.username;
        const user= await tweets.findOne({username});
        if(user === null) return reply.status(403).send({msg: "User cant be found"})
        else{
            return reply.status(200).send({tweets: user.tweets});
        }
    }
    public async deleteTweet(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const {username, position} = request.body;
        const user=await tweets.findOne({username});
        if(user === null) return {msg: "User cant be found"}
        else if(position!==undefined){
            user.tweets?.splice(position,1)
            user.save()
            return reply.status(201).send({msg: 'tweet eleminado', user})
        }
    }
}

export const whisper= new Whisper();