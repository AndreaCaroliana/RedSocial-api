import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest} from "fastify";
import { bouncer } from "../controllers/bouncer.controllers";
import { CustomRequest } from "../types/user.type";

const UserRoutes: FastifyPluginCallback= (fastify: FastifyInstance, opt: any, done: any)=>{

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

        done()
}

export default UserRoutes;