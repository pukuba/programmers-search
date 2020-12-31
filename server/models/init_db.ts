import dotenv from 'dotenv'
import path from 'path'
import { MongoClient } from 'mongodb'
import csv from 'csvtojson'
const csvFilePath = "./db.csv"

dotenv.config({ path: path.join(__dirname, '../.env') })

const init = async () => {
    const jsonArray = await csv().fromFile(csvFilePath)

    const client = await MongoClient.connect(
        String(process.env.DB_HOST1), {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )

    const db = client.db()
    const ls = await db.listCollections().toArray()
    if (ls.length !== 0) {
        await db.collection('problem').drop()
    }

    await db.collection('problem').insertMany(jsonArray)

    console.log("db insert success")
    process.exit(0)
}

init()