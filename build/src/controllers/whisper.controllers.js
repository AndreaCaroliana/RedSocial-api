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
exports.whisper = void 0;
const tweets_model_1 = __importDefault(require("../models/tweets.model"));
class Whisper {
    newTweet(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, tweet } = request.body;
            const user = yield tweets_model_1.default.findOneAndUpdate({ username }, { $push: { tweets: tweet } });
            if (user === null)
                return { msg: "User cant be found" };
            else {
                return reply.status(201).send({ msg: 'tweet guardado', user });
            }
        });
    }
    getTweets(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = request.query.username;
            const user = yield tweets_model_1.default.findOne({ username });
            if (user === null)
                return reply.status(403).send({ msg: "User cant be found" });
            else {
                return reply.status(200).send({ tweets: user.tweets });
            }
        });
    }
    deleteTweet(request, reply) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { username, position } = request.body;
            const user = yield tweets_model_1.default.findOne({ username });
            if (user === null)
                return { msg: "User cant be found" };
            else if (position !== undefined) {
                (_a = user.tweets) === null || _a === void 0 ? void 0 : _a.splice(position, 1);
                user.save();
                return reply.status(201).send({ msg: 'tweet eleminado', user });
            }
        });
    }
}
exports.whisper = new Whisper();
