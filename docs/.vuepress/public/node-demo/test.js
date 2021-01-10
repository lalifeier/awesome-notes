const fs = require('fs')
const path = require('path')

const exec = require('child_process').exec

function getFileDuration (filePath) {
  return new Promise(resolve => {
    exec(`ffmpeg -i ${filePath}`, function (err, stdout, stderr) {
      const res = stderr.toString()
      const result = /Duration: ([0-9\:\.]+),/.exec(res)
      if (result && result[1]) {
        const duration = result[1]
        resolve({
          filePath,
          duration: timeToSec(duration)
        })
      }
    })
  })
}

function timeToSec (time) {
  const hour = time.split(':')[0]
  const min = time.split(':')[1]
  const sec = time.split(':')[2]
  return Number(hour * 3600) + Number(min * 60) + Number(sec)
}

const dir = '/home/lalifeier/project/test'

function fn (dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      fn(filePath);
    } else {
      getFileDuration(filePath).then((res) => {
        console.log(res)
      })
    }
  }
}

fn(dir)
