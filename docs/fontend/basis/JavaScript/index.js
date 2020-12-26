function promisic(func) {
  return function(params = {}) {
    return new Promise((resolve, reject) => {
      const args = Object.assign(params, {
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          reject(err);
        },
      });
      func(args);
    });
  };
}

const fs = require("fs");

function promisify(func) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push((err, res) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
      return func.apply(func, args);
    });
  };
}

const readFileASync = promisify(fs.readFile);

readFileASync("./README.md")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
