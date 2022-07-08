import { FastifyReply } from "fastify";
import { type } from "os";
import { socialUser } from "../models/user.model";
import { CustomRequest } from "../types/influencer.type";

class Influencer {
     public async newFollower(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const {username, follower}=request.body
        const user= await socialUser.findOneAndUpdate({username}, {$push:{followers: follower}});
        if(user === null) return {msg: "User cant be found"}
        else{
            return reply.status(201).send({msg: 'you just follow'+username, user})
        }
     }
     public async getFollowers(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const username = request.query.username;
        const user= await socialUser.findOne({username});
        if(user === null) return reply.status(403).send({msg: "User cant be found"})
        else{
            return reply.status(200).send({followers: user.followers});
        }
     }
     public async getFollows(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const username = request.query.username;
        const user= await socialUser.findOne({username});
        if(user === null) return reply.status(403).send({msg: "User cant be found"})
        else{
            return reply.status(200).send({followers: user.follows});
        }
     }
     public async unfollow(request:CustomRequest, reply: FastifyReply): Promise<any>{
        const {username, position} = request.body;
        const user=await socialUser.findOne({username});
        if(user === null) return {msg: "User cant be found"}
        else if(position!==undefined){
            const unfollowUser=user.follows?.splice(position,1);
            if(unfollowUser!==undefined){
                const userUnfollow= await socialUser.findOne({username:unfollowUser[0]})
                if(userUnfollow===null) return {msg: "User cant be found"}
                else if(position!==undefined) {
                    userUnfollow.followers?.splice(position,1);
                    user.save()
                    userUnfollow.save()
                    return reply.status(201).send({msg: 'you just have unfollowed'+userUnfollow.username})
                }
                else return  {msg: "we cant make procces your solicitude"}
            }
            else return  {msg: "we cant make procces your solicitude"}
            
        }
        else return  {msg: "we cant make procces your solicitude"}
    }
}

export const influencer= new Influencer();