"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialUser = void 0;
const mongoose_1 = require("mongoose");
const socialUserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    followers: [{ type: String }],
    follows: [{ type: String }]
});
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String },
    location: { type: String },
    birthday: { type: Date },
    bio: { type: String }
});
const user = (0, mongoose_1.model)('users', userSchema);
exports.socialUser = (0, mongoose_1.model)('social_user', socialUserSchema);
exports.default = user;
