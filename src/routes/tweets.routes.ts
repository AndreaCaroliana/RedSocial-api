import fastify, { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import { whisper } from "../controllers/whisper.controllers";
import { CustomRequest } from "../types/tweet.type";

const TweetsRoutes: FastifyPluginCallback = (fastify: FastifyInstance, opt: any, done: any)=>{
    

    const AuthOptions={
        onRequest: (request: CustomRequest, reply: FastifyReply, done: any)=>{
                const err=null;
                const auth=request.headers.authorization;
                if(auth===undefined){
                        reply.status(500).send({msg:'permissed denied'})
                }
                else{
                        try{
                                const token= auth.split(' ')[1];
                                fastify.jwt.verify(token);
                        }catch(error){
                                reply.status(500).send({msg:'permissed denied, wrong token', error});
                        }
                }
                        
                done(err);
        }
    }

    fastify.put('/newTweet', AuthOptions ,whisper.newTweet);
    fastify.get('/tweets', AuthOptions ,whisper.getTweets);
    done()
}

export default TweetsRoutes;    