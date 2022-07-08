"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.bouncer = void 0;
const tweets_model_1 = __importDefault(require("../models/tweets.model"));
const user_model_1 = __importStar(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const salt = 13;
class Bouncer {
    register(req, rep) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { username, email, password } = req.body;
            const thereIsUser = yield user_model_1.default.findOne({ email: email });
            if (thereIsUser === null && password !== undefined) {
                const hash = yield bcrypt_1.default.hashSync(password, salt);
                const newUser = yield new user_model_1.default({ username, email, password: hash, location: '', name: '', birthday: '', bio: '', });
                const userTweets = yield new tweets_model_1.default({ username, tweets: [] });
                const socialUserData = yield new user_model_1.socialUser({ username, followers: [], follows: [] });
                yield socialUserData.save();
                yield newUser.save();
                yield userTweets.save();
                return { msg: 'succesful operation, new user registered', newUser };
            }
            else if (password === undefined) {
                return { msg: 'Please, put a password' };
            }
            else if (thereIsUser !== null && (thereIsUser.username === username || thereIsUser.email === email)) {
                return { msg: 'user already existed, please change username or email' };
            }
        });
    }
    //handler para login de usuarios
    login(req, rep) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const thereIsUser = yield user_model_1.default.findOne({ email: email });
            if (thereIsUser === null)
                return rep.status(403).send({ msg: 'user dont existed' });
            else if (thereIsUser.password === undefined || password === undefined)
                return rep.status(403).send({ msg: 'password is empty' });
            else if (bcrypt_1.default.compareSync(password, thereIsUser.password)) {
                const userTweets = yield tweets_model_1.default.findOne({ username: thereIsUser.username });
                return rep.status(200).send({ msg: 'free pass', username: thereIsUser.username, tweets: userTweets === null || userTweets === void 0 ? void 0 : userTweets.tweets });
            }
            else
                return rep.status(403).send({ msg: 'incorrect password' });
        });
    }
}
exports.bouncer = new Bouncer();
