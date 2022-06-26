import Fastify from "fastify";

const PORT = Number(process.env.PORT || 3000);

const fastify = Fastify({ logger: { transport: { target: "pino-pretty" } } });

fastify.get("/", (req, rep) => {
  rep.send({ hello: "world" });
});

const start = async () => {
  await fastify.listen({ port: PORT }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  });
};

start();
