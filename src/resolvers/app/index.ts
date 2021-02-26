import { Db } from "mongodb"
import { rand } from "lib"
import { Problem } from "config/Types"
const getAllProblem = async (parent: void, args: void, { db }: { db: Db }) => {
    return await db.collection("problem").find().toArray()
}

const findProblem = async (parent: void, { text }: { text: String }, { db }: { db: Db }) => {
    return await db.collection("problem").find({ title: { $regex: new RegExp(".*" + text) } }).toArray()
}

const findLevelByProblem = async (parent: void, { levels }: { levels: number[] }, { db }: { db: Db }) => {
    const ret: Problem[][] = await Promise.all(levels.map(async (lv: number) => {
        return await db.collection("problem").find({ lv: lv + "" }).toArray()
    }))
    return ret.reduce((acc, cur) => acc.concat(cur))
}

const getRandomProblem = async (parent: void, args: void, { db }: { db: Db }) => {
    const count = await db.collection("problem").estimatedDocumentCount()
    const id = rand(0, count - 1)
    const problem = await db.collection("problem").find().skip(id).limit(1).toArray()
    return problem[0]
}

const getAllProblemCount = async (parent: void, args: void, { db }: { db: Db }) => {
    return await db.collection("problem").estimatedDocumentCount()
}

export { getAllProblem, findProblem, findLevelByProblem, getRandomProblem, getAllProblemCount }