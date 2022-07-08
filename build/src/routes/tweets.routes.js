"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whisper_controllers_1 = require("../controllers/whisper.controllers");
const TweetsRoutes = (fastify, opt, done) => {
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
};
exports.default = TweetsRoutes;
