import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest} from "fastify";
import { admin } from "../controllers/admin.controllers";
import { bouncer } from "../controllers/bouncer.controllers";
import { influencer } from "../controllers/influencer.controller";
import { CustomRequest } from "../types/influencer.type";


const InfluencerRoutes: FastifyPluginCallback= async (fastify: FastifyInstance, opt: any, done: any)=>{
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
      


        fastify.put('/follow', AuthOptions, influencer.newFollower);
        fastify.get('/getFollowers', AuthOptions, influencer.getFollowers);
        fastify.get('/getFollows', AuthOptions, influencer.getFollows);
        fastify.delete('/unfollow', AuthOptions,influencer.unfollow);

        done()
}

export default InfluencerRoutes;