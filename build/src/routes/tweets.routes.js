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
Object.defineProperty(exports, "__esModule", { value: true });
const whisper_controllers_1 = require("../controllers/whisper.controllers");
const TweetsRoutes = (fastify, opt, done) => __awaiter(void 0, void 0, void 0, function* () {
    const AuthOptions = {
        onRequest: (request, reply, done) => {
            const err = null;
            const auth = request.headers.authorization;
            if (auth === undefined) {
                reply.status(500).send({ msg: 'permissed denied' });
            }
            else {
                try {
                    const token = auth.split(' ')[1];
                    fastify.jwt.verify(token);
                }
                catch (error) {
                    reply.status(500).send({ msg: 'permissed denied, wrong token', error });
                }
            }
            done(err);
        }
    };
    fastify.put('/newTweet', AuthOptions, whisper_controllers_1.whisper.newTweet);
    fastify.get('/tweets', AuthOptions, whisper_controllers_1.whisper.getTweets);
    fastify.delete('/deleteTweet', AuthOptions, whisper_controllers_1.whisper.deleteTweet);
    done();
});
exports.default = TweetsRoutes;
