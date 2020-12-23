const RedisHelper = require("../utils/redisHelper");

// console.log(await RedisHelper.set('test12', 123));
console.log(await RedisHelper.set("testass", 123));
// console.log(await RedisHelper.set('testdw', 123));
// console.log(await RedisHelper.set('testdfssfd', 123));

// console.log(await RedisHelper.del('testass'));

console.log(await RedisHelper.keys("test*"));

console.log(await RedisHelper.delByKeys("test*"));
