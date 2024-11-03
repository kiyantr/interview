import KeyvRedis from '@keyv/redis';
import Keyv from 'keyv';

export const redisCache = new Keyv(new KeyvRedis('redis://localhost:6379'));