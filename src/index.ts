import Fastify from "fastify";
import routes from './routes/user.routes'
import connection from './utils/database.utils'
connection()
const PORT = Number(process.env.PORT || 3000);

const fastify = Fastify({ logger: { transport: { target: "pino-pretty" } } });

fastify.register(routes);


const start = async () => {
  await fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};

start();
