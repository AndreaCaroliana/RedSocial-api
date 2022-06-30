import { FastifyRequest } from "fastify"
import Tweet from "../interfaces/tweet.interface"

export type CustomRequest= FastifyRequest<{ //Modificacion del tipo FastifyRequest para manejo de body
    Body: Tweet,
    Querystring: {username: string}
}>