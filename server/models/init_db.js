const dotenv = require('dotenv')
const path = require('path')

const { MongoClient } = require('mongodb')

const csv = require('csvtojson')
const csvFilePath = "./db.csv"

dotenv.config({ path: path.join(__dirname, '../.env') })

const init = async () => {
    const jsonArray = await csv().fromFile(csvFilePath)

    const client = await MongoClient.connect(
        process.env.DB_HOST1, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )

    const db = client.db()
    await db.collection('problem').drop()
    await db.collection('problem').insertMany(jsonArray)

    console.log("db insert success")
    process.exit(0)
}

init()