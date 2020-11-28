const { WriteStream } = require('fs-capacitor')
const fs = require('fs')

const uploadStream = (stream, path) =>
    new Promise((resolve, reject) => {
        const capacitor = new WriteStream()
        const destination = fs.createWriteStream(path);
        stream.pipe(capacitor)
        capacitor
            .createReadStream()
            .pipe(destination)
            .on('error', reject)
            .on('finish', resolve)
    })

const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min

module.exports = { uploadStream, rand }