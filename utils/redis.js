#!/usr/bin/yarn dev
import exp from 'constants';
import { createclient, print } from 'redis';
import { promisify } from 'util';

class RedisClient {
  /**
    * RedisClient class
    */
  constructor() {
    this.client = createclient();
    this.isClientConnected = true;
    this.client.on('error', (err) => {
    console.error('Redis client failed to connect:', err.message || err.toString());
    });
    this.client.on('connect', () => {
    this.isClientConnected = true;
    });
  }
  /**
   * Check if the client connection to Redis is live
   */
  isAlive() {
    return this.isClientConnected;
  }
  /**
   * Redis operation on a given value
   * @param {String} key: the key of the item
   * @param {String | Object}
   */
  async get(key) {
    return promisify(this.client.get).bind(this.client)(key)
  }

  /**
   * Stores a key and its value along with an expiration time.
   * @param {String} key The key of the item to store.
   * @param {String | Number | Boolean} value The item to store.
   * @param {Number} duration The expiration time of the item in seconds.
   * @returns {Promise<void>}
   */

  async set(key, value, duration) {
    await promisify(this.client.SETEX)
      .bind(this.client)(key, duration, value);
  }

  /**
   * Removes the value of a given key.
   * @param {String} key The key of the item to remove.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisclient = new RedisClient();
export default redisclient;