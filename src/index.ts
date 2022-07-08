import Fastify from "fastify";
import UserRoutes from './routes/user.routes'
import connection from './utils/database.utils'
import fastifyJwt from "@fastify/jwt";
import config from './config';
import formbody from '@fastify/formbody'
import TweetsRoutes from "./routes/tweets.routes";
import InfluencerRoutes from "./routes/influencer.routes";

connection()

const PORT = Number(process.env.PORT || 3000);

const HOST= process.env.HOST || '192.168.1.103'

const fastify = Fastify({ logger: { transport: { target: "pino-pretty" } } });

fastify.register(formbody)
fastify.register(fastifyJwt,{secret: config.SECRET});
fastify.register(UserRoutes);
fastify.register(TweetsRoutes);
fastify.register(InfluencerRoutes)

const start = async () => {
  await fastify.listen({ port: PORT, host:HOST}, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};

start();
