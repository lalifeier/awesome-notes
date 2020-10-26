const express = require('express')
const app = express()
const path = require('path')
const fse = require('fs-extra')
const multiparty = require('multiparty')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const UPLOAD_DIR = path.resolve(__dirname, '..', 'target')
const extractExt = filename =>
  filename.slice(filename.lastIndexOf('.'), filename.length)

app.post('/api/upload', function(req, res) {
  const form = new multiparty.Form()
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return
    }
    const [chunk] = files.chunk
    const [hash] = fields.hash
    const [fileHash] = fields.fileHash
    const [filename] = fields.filename

    const filePath = path.resolve(
      UPLOAD_DIR,
      `${fileHash}${extractExt(filename)}`
    )
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash)

    if (fse.existsSync(filePath)) {
      res.send('file exist')
      return
    }
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }
    // try {
    await fse.move(chunk.path, path.resolve(chunkDir, hash))
    // } catch (err) {}

    res.send('received file chunk')
  })
})

const pipeStream = (path, writeStream) =>
  new Promise(resolve => {
    // console.log(path)
    let readStream
    try {
      readStream = fse.createReadStream(path).pipe(writeStream)
    } catch (error) {
      console.log(error)
    }
    readStream.on('open', () => {
      console.log('open')
    })
    readStream.on('data', data => {
      console.log(data)
    })
    readStream.on('end', () => {
      console.log('end')
      fse.unlinkSync(path)
      resolve()
    })
    readStream.on('error', err => {
      console.log(err)
    })
    readStream.on('close', err => {
      console.log('close')
    })
  })

const mergeFileChunk = async (filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  const chunkPaths = await fse.readdir(chunkDir)
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) =>
      pipeStream(
        path.resolve(chunkDir, chunkPath),
        fse.createWriteStream(filePath, {
          start: index * size,
          end: (index + 1) * size,
        })
      )
    )
  )
  fse.rmdirSync(chunkDir)
}

app.post('/api/merge', bodyParser.json(), async function(req, res) {
  const { filename, size } = req.body
  const filePath = path.resolve(UPLOAD_DIR, `${filename}`)
  // console.log(filePath, size)
  // await mergeFileChunk(filePath, filename, size)
  res.send('file merged success')
})

app.listen(3000)
