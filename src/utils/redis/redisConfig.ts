import { Redis } from "@upstash/redis";

const getRedisCredentials = () => {
    if (process.env.NEXT_PUBLIC_REDIS_URL_HTTP && process.env.NEXT_PUBLIC_REDIS_TOKEN) {
        const arr: string[] = [process.env.NEXT_PUBLIC_REDIS_URL_HTTP, process.env.NEXT_PUBLIC_REDIS_TOKEN];
        return arr;
    }

    else {
        throw new Error("REDIS_URL or REDIS_TOKEN is not defined as an environment variable")
    }

}


const redis = new Redis(
    {
        url: getRedisCredentials()[0], 
        token: getRedisCredentials()[1]
    }
);

export default redis;