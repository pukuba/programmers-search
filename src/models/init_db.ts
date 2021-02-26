import dotenv from "dotenv"
import path from "path"
import csv from "csvtojson"
const csvFilePath = path.join(__dirname, "db.csv")

dotenv.config({ path: path.join(__dirname, "../.env") })
import DB from "../config/connectDB"
const init = async () => {
    const jsonArray = await csv().fromFile(csvFilePath)


    const db = await DB.get()
    const ls = await db.listCollections().toArray()
    for (const idx in ls) {
        await db.collection(ls[idx].name).drop()
    }

    await db.collection("problem").insertMany(jsonArray)

    console.log("db insert success")
    process.exit(0)
}

init()