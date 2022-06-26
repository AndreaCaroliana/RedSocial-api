import { FastifyReply, FastifyRequest } from "fastify";
import User from "../interfaces/user.interface";
import user from "../models/user.model";

type CustomRequest= FastifyRequest<{ //Modificacion del tipo FastifyRequest para manejo de body
    Body: User
}>
class Bouncer{

    //handler para registro de usuario

    public async register(req: CustomRequest, rep: FastifyReply): Promise<any>{
        const {username, email, password}=req.body;
        const thereIsUser= await user.findOne({email: email})
        if (thereIsUser === null){
            const newUser= await new user({username, email, password})
            await newUser.save()
            return {msg: 'succesful operation, new user registered', newUser};
        }
        else if(thereIsUser.username === username || thereIsUser.email === email){
            return {msg: 'user already existed, please change username or email'}
        }
    }

    //handler para login de usuarios

    public async login(req: CustomRequest, rep: FastifyReply): Promise<any>{
        const {email, password}=req.body;
        const thereIsUser= await user.findOne({email: email})
        if(thereIsUser=== null) return {msg: 'user dont exist'};
        else if(thereIsUser.password!==password) return {msg: 'incorrect password'}
        else if(thereIsUser.password===password) return {msg: 'free pass'}

    }
}

export const bouncer= new Bouncer();