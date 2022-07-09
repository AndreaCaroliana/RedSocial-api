import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest} from "fastify";
import { admin } from "../controllers/admin.controllers";
import { bouncer } from "../controllers/bouncer.controllers";
import { influencer } from "../controllers/influencer.controller";
import { CustomRequest } from "../types/user.type";

const UserRoutes: FastifyPluginCallback= (fastify: FastifyInstance, opt: any, done: any)=>{
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
        const SingInOptions={
                preSerialization: (request: CustomRequest, reply: FastifyReply, payload: any, done: any)=>{
                        const err=null;
                        if(payload.msg==='free pass'){
                                const newPayload={...payload,token: fastify.jwt.sign({payload}, {expiresIn: '24h'})}
                                 done(err, newPayload);
                        }
                        else{
                                done(err, payload);
                        }
                }
        }




        fastify.post('/register',bouncer.register);
        fastify.post('/login', SingInOptions, bouncer.login);
        fastify.put('/updateProfile', AuthOptions, admin.updateUser);
        fastify.get('/getUser', AuthOptions, admin.getUser);
        fastify.get('/getProfile', AuthOptions, admin.getProfile);
        done()
}

export default UserRoutes;