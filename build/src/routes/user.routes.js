"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_controllers_1 = require("../controllers/admin.controllers");
const bouncer_controllers_1 = require("../controllers/bouncer.controllers");
const UserRoutes = (fastify, opt, done) => {
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
    const SingInOptions = {
        preSerialization: (request, reply, payload, done) => {
            const err = null;
            if (payload.msg === 'free pass') {
                const newPayload = Object.assign(Object.assign({}, payload), { token: fastify.jwt.sign({ payload }, { expiresIn: '24h' }) });
                done(err, newPayload);
            }
            else {
                done(err, payload);
            }
        }
    };
    fastify.post('/register', bouncer_controllers_1.bouncer.register);
    fastify.post('/login', SingInOptions, bouncer_controllers_1.bouncer.login);
    fastify.put('/updateProfile', AuthOptions, admin_controllers_1.admin.updateUser);
    fastify.get('/getUser', AuthOptions, admin_controllers_1.admin.getUser);
    fastify.get('/getProfile', AuthOptions, admin_controllers_1.admin.getProfile);
    done();
};
exports.default = UserRoutes;
