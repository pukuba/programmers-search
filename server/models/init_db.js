const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const path = require('path')

const csv = require('csvtojson')
const csvFilePath = "./db.csv"

dotenv.config({ path: path.join(__dirname, '../.env') })


const init = async () => {

    const client = await MongoClient.connect(
        process.env.DB_HOST2, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }
    )

    const db = client.db()
    const jsonArray = await csv().fromFile(csvFilePath)
    await db.collection('problem').insertMany(jsonArray)
    
    console.log("db insert success")
    process.exit(0)
}

init()