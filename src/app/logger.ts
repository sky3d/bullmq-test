import pino from 'pino'

export const logger = pino({
    name: 'bullmq-app',
    level: 'debug',
})
