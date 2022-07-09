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

fastify.register(cors)
fastify.register(formbody)
fastify.register(fastifyJwt,{secret: config.SECRET});
fastify.register(UserRoutes);
fastify.register(TweetsRoutes);
fastify.register(InfluencerRoutes)

const start = async () => {
  await fastify.listen({ port: 3000, host: '0.0.0.0'}, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};

start();
