import { FastifyRequest } from "fastify"

export  type CustomRequest= FastifyRequest<{ //Modificacion del tipo FastifyRequest para manejo de body
    Body: {
        username:string,
        follower: string,
        position: number
    }
    Querystring: {username: string}
}>