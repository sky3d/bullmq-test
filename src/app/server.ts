import Fastify, { FastifyServerOptions } from 'fastify'
import { routeOptions } from './ schema'
import { config } from '../config'
import { RedisStore } from '../store/redisStore'

export type AppOptions = Partial<FastifyServerOptions>

async function buildServer(options: AppOptions = {}) {
  const fastify = Fastify(options)

  fastify.decorate('store', new RedisStore(config.redis, fastify.log))

  if (process.env.DEBUG) {
    fastify.addHook('preValidation', async (request, reply) => {
      const { params, query, body } = request
      request.log.info({ params, query, body }, `--> ${request.method} ${request.url}`)
    })
    fastify.addHook('onError', async (request, reply, error) => {
      request.log.info({ error }, `!ERR on ${request.method} ${request.url} code=${reply.code}`)
    })
  }

  fastify.get('/test', routeOptions, async (request, reply) => {
    const now = Date.now()
    fastify.log.debug('/test', now)

    const task = await fastify.store.createTask('new one')

    fastify.log.debug({ task }, 'task created successfully')

    return { status: 'ok', ts: now }
  })


  return fastify
}

export { buildServer }
