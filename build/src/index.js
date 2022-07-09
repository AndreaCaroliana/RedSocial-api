"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const database_utils_1 = __importDefault(require("./utils/database.utils"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const config_1 = __importDefault(require("./config"));
const formbody_1 = __importDefault(require("@fastify/formbody"));
const tweets_routes_1 = __importDefault(require("./routes/tweets.routes"));
const influencer_routes_1 = __importDefault(require("./routes/influencer.routes"));
const cors_1 = __importDefault(require("@fastify/cors"));
(0, database_utils_1.default)();
const fastify = (0, fastify_1.default)({ logger: true });
fastify.log.info('no tardo');
fastify.register(cors_1.default);
fastify.log.info('no tardo 1');
fastify.register(formbody_1.default);
fastify.log.info('no tardo 2');
fastify.register(jwt_1.default, { secret: config_1.default.SECRET });
fastify.log.info('no tardo 3');
fastify.register(user_routes_1.default);
fastify.log.info('no tardo 4');
fastify.register(tweets_routes_1.default);
fastify.log.info('no tardo 5');
fastify.register(influencer_routes_1.default);
fastify.log.info('no tardo 6');
fastify.listen({ port: Number(process.env.HOST || 3000), host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});
