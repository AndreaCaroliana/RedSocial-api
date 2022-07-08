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
exports.influencer = void 0;
const user_model_1 = require("../models/user.model");
class Influencer {
    newFollower(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, follower } = request.body;
            const user = yield user_model_1.socialUser.findOneAndUpdate({ username }, { $push: { followers: follower } });
            if (user === null)
                return { msg: "User cant be found" };
            else {
                return reply.status(201).send({ msg: 'you just follow' + username, user });
            }
        });
    }
    getFollowers(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = request.query.username;
            const user = yield user_model_1.socialUser.findOne({ username });
            if (user === null)
                return reply.status(403).send({ msg: "User cant be found" });
            else {
                return reply.status(200).send({ followers: user.followers });
            }
        });
    }
    getFollows(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = request.query.username;
            const user = yield user_model_1.socialUser.findOne({ username });
            if (user === null)
                return reply.status(403).send({ msg: "User cant be found" });
            else {
                return reply.status(200).send({ followers: user.follows });
            }
        });
    }
    unfollow(request, reply) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { username, position } = request.body;
            const user = yield user_model_1.socialUser.findOne({ username });
            if (user === null)
                return { msg: "User cant be found" };
            else if (position !== undefined) {
                const unfollowUser = (_a = user.follows) === null || _a === void 0 ? void 0 : _a.splice(position, 1);
                if (unfollowUser !== undefined) {
                    const userUnfollow = yield user_model_1.socialUser.findOne({ username: unfollowUser[0] });
                    if (userUnfollow === null)
                        return { msg: "User cant be found" };
                    else if (position !== undefined) {
                        (_b = userUnfollow.followers) === null || _b === void 0 ? void 0 : _b.splice(position, 1);
                        user.save();
                        userUnfollow.save();
                        return reply.status(201).send({ msg: 'you just have unfollowed' + userUnfollow.username });
                    }
                    else
                        return { msg: "we cant make procces your solicitude" };
                }
                else
                    return { msg: "we cant make procces your solicitude" };
            }
            else
                return { msg: "we cant make procces your solicitude" };
        });
    }
}
exports.influencer = new Influencer();
