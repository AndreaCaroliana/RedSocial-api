import { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest} from "fastify";
import { bouncer } from "../controllers/bouncer.controllers";
import formbody from '@fastify/formbody'
import fastifyJwt from "@fastify/jwt";
import config from '../config';
import { CustomRequest } from "../types/user.type";



const routes: FastifyPluginCallback= (fastify: FastifyInstance, opt: any, done: any)=>{

        fastify.register(formbody)
        fastify.register(fastifyJwt,{secret: config.SECRET});

        const SingInOptions={
                preSerialization: (request: CustomRequest, reply: FastifyReply, payload: any, done: any)=>{
                        const err=null;
                        const newPayload={ms: 'user connected',token: fastify.jwt.sign({payload}, {expiresIn: '10min'})}
                        done(err, newPayload);
                }
        }

        const AuthOptions={
                onRequest: (request: CustomRequest, reply: FastifyReply, done: any)=>{
                        const err=null;
                        const token=request.headers.authorization;
                        if(token===undefined){
                                reply.status(500).send({msg:'permissed denied'})
                        }
                        else{
                                try{
                                        fastify.jwt.verify(token);
                                }catch(error){
                                        reply.status(500).send({msg:'permissed denied, wrong token', error});
                                }
                        }
                                
                        done(err);
                }
        }



        fastify.post('/register',bouncer.register);
        fastify.post('/login', SingInOptions, bouncer.login);

        done()
}

export default routes;