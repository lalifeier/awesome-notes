const redis = require('redis');

const defaultConfig = {
  port: 6380,
  host: '127.0.0.1',
  password: ''
};

class RedisHelper {
  constructor(config) {
    config = Object.assign(defaultConfig, config);
    this.client = redis.createClient(config);

    this.client.on('error', (error) => {
      console.error(error);
    });
  }

  end() {
    this.client.end(true);
  }

  async set(key, value) {
    return new Promise((resolve, reject) => {
      this.client.set(key, value, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply.toString());
      });
    });
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply.toString());
      });
    });
  }

  async keys(key) {
    return new Promise((resolve, reject) => {
      this.client.keys(key, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply);
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(reply.toString());
      });
    });
  }

  async delByKeys(key) {
    const keys = await this.keys(key);
    for (const key of keys) {
      await this.del(key);
    }
  }
}

module.exports = new RedisHelper({
  port: 6379,
  host: '127.0.0.1',
  password: ''
});
