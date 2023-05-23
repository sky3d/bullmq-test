import { buildServer, AppOptions } from './app/server'
import { logger } from './app/logger'

const options: AppOptions = {
    logger
}

const start = async () => {
    const app = await buildServer(options)
    try {
        await app.listen({ port: 3000, host: 'localhost' })

    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
