import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import tweets from "../models/tweets.model";
import user from "../models/user.model";
import { CustomRequest } from "../types/user.type";
import bcrypt from 'bcrypt';

const salt: number=13;
class Bouncer{

    public async register(req: CustomRequest, rep: FastifyReply): Promise<any>{
        const {username, email, password}=req.body;
        const thereIsUser= await user.findOne({email: email});
        if (thereIsUser === null && password!==undefined){
            const hash= await bcrypt.hashSync(password,salt);
            const newUser= await new user({username, email, password: hash});
            const userTweets= await new tweets({username, tweets: []});
            await newUser.save();
            await userTweets.save();
    
            return {msg: 'succesful operation, new user registered', newUser};
        }
        else if(password===undefined){
            return {msg: 'Please, put a password'};
        }
        else if(thereIsUser !==null && (thereIsUser.username === username || thereIsUser.email === email)){
            return {msg: 'user already existed, please change username or email'}
        }
    }

    //handler para login de usuarios

    public async login(req: CustomRequest, rep: FastifyReply): Promise<any>{
        const {email, password}=req.body;
        const thereIsUser= await user.findOne({email: email})
        if(thereIsUser=== null) return rep.status(403).send('user dont existed');
        else if(thereIsUser.password===undefined || password===undefined) return rep.status(403).send('password is empty');
        else if(bcrypt.compareSync(password, thereIsUser.password)) return {msg: 'free pass'};
        else return rep.status(403).send('incorrect password');

    }
}

export const bouncer= new Bouncer();