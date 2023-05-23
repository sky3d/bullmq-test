import { data } from 'common-errors'
import map = require('lodash/map')

export const handlePipeline = (args: any[]) => {
    const errors = []
    const response = Array(args.length)

    for (const [idx, [err, res]] of args.entries()) {
        if (err) {
            errors.push(err)
        }

        response[idx] = res
    }

    if (errors.length) {
        const message = map(errors, 'message')
            .join('; ')

        throw new data.RedisError(message)
    }

    return response
}
