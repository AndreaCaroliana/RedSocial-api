"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || '192.168.1.103';
const fastify = (0, fastify_1.default)({ logger: { transport: { target: "pino-pretty" } } });
fastify.register(cors_1.default);
fastify.register(formbody_1.default);
fastify.register(jwt_1.default, { secret: config_1.default.SECRET });
fastify.register(user_routes_1.default);
fastify.register(tweets_routes_1.default);
fastify.register(influencer_routes_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield fastify.listen({ port: PORT, host: HOST }, (err, address) => {
        if (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    });
});
start();
