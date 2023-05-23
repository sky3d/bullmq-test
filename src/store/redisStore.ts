import { Redis } from 'ioredis'
import { data as errors } from 'common-errors'

import { App, Task } from '../module'
import { stringifyObj } from '../utils'

export const generateId = () => Math.random().toString(36).slice(7)

export class RedisStore {
    static taskKey(id: string | number) {
        return `task:${id}`
    }
    static taskListKey() {
        return `task:all`
    }


    public log: any
    public readonly redis: Redis

    constructor(config: { name: string }, log: any) {
        this.log = log
        const opts = config

        this.redis = new Redis({
            ...opts,
        })
    }

    public createTask = async (label: string): Promise<Task> => {
        const pipe = this.redis.pipeline()
        const id = generateId()

        const item: Task = {
            id,
            label,
            ts: Date.now()
        }

        pipe.hmset(RedisStore.taskKey(id), stringifyObj(item))
        pipe.sadd(RedisStore.taskListKey(), id)

        await pipe.exec()

        return item
    }
}

