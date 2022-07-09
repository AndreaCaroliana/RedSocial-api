import Fastify from "fastify";
import UserRoutes from './routes/user.routes'
import connection from './utils/database.utils'
import fastifyJwt from "@fastify/jwt";
import config from './config';
import formbody from '@fastify/formbody'
import TweetsRoutes from "./routes/tweets.routes";
import InfluencerRoutes from "./routes/influencer.routes";
import cors from "@fastify/cors"
connection()



const fastify = Fastify({ logger: true });
fastify.log.info('no tardo')
fastify.register(cors)
fastify.log.info('no tardo 1')
fastify.register(formbody)
fastify.log.info('no tardo 2')
fastify.register(fastifyJwt,{secret: config.SECRET});
fastify.log.info('no tardo 3')
fastify.register(UserRoutes);
fastify.log.info('no tardo 4')
fastify.register(TweetsRoutes);
fastify.log.info('no tardo 5')
fastify.register(InfluencerRoutes)
fastify.log.info('no tardo 6')

 fastify.listen({ port: Number(process.env.HOST || 3000), host: '0.0.0.0'}, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`server listening on ${address}`)
  });
