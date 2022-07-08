import { profile } from "console";
import { FastifyReply } from "fastify";
import user from "../models/user.model";
import { CustomRequest } from "../types/user.type";

class Admin{
    public async updateUser(request:CustomRequest, reply: FastifyReply):Promise<any>{
        const {username}=request.body;
        const userUpdate=request.body;
        const userData=await user.findOne({username});
        if(userData===null){
            return reply.status(403).send({msg: username+', we cant find your data'})
        }
        else{
            userData.username=userUpdate.username;
            userData.email=userUpdate.email;
            userData.password=userUpdate.password;
            userData.location=userUpdate.location;
            userData.name=userUpdate.name;
            userData.birthday=userUpdate.birthday;
            userData.bio=userUpdate.bio;
            userData.save();
            
            return reply.status(201).send({msg: username+', your data have been actualized'})
        }
    }
    public async getProfile(request:CustomRequest, reply: FastifyReply):Promise<any>{
        const {username}=request.query;
        const userData=await user.findOne({username});
        if(userData===null){
            return reply.status(403).send({msg: username+', we cant find your data'})
        }
        else{
            const userProfile=userData
            return reply.status(201).send({userProfile})
        }
    }
    public async getUser(request:CustomRequest, reply: FastifyReply):Promise<any>{
        const {username}=request.query;
        const userData=await user.findOne({username});
        if(userData===null){
            return reply.status(403).send({msg: username+', we cant find your data'})
        }
        else{
            const {username, bio ,location, birthday,name}=userData
            return reply.status(201).send({username, bio ,location, birthday, name})
        }
    }
}

export const admin= new Admin();