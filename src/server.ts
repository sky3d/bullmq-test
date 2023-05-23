import Fastify, { FastifyServerOptions } from 'fastify'
import { routeOptions } from './ schema'

export type AppOptions = Partial<FastifyServerOptions>

async function buildServer(options: AppOptions = {}) {
  const fastify = Fastify(options)

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

    return { status: 'ok', ts: now }
  })


  return fastify
}

export { buildServer }
