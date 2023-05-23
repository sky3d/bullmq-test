import { RouteShorthandOptions } from 'fastify'

export const routeOptions: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: {
                        type: 'string',
                    },
                    ts: {
                        type: 'number',
                    }
                },
            },
        },
    },
}

