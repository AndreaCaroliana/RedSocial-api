import fastify, { FastifyInstance, FastifyPluginCallback, FastifySchema } from "fastify";
import { bouncer } from "../controllers/bouncer.controllers";
import formbody from '@fastify/formbody'
const routes: FastifyPluginCallback= (fastify: FastifyInstance, opt: any, done: any)=>{
        fastify.register(formbody)
        fastify.post('/register', bouncer.register);
        fastify.post('/login', bouncer.login);
        done()
}

export default routes;