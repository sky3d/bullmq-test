import { FastifyInstance } from 'fastify'
import { RedisStore } from './store/redisStore'

type Config = {
    redisHost: string
}

interface App {
    server: FastifyInstance
    config: Config
}

type Task = {
    id: string
    label: string
    ts: number
}

declare module 'fastify' {
    interface FastifyInstance {
        store: RedisStore,
        log: any,
    }
}
