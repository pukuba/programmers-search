import { Db } from 'mongodb'
import { rand } from '../../lib'

const test = () => {
    return "Hello World!"
}

const getAllProblem = async (parent: any, args: any, { db }: { db: Db }) => {
    return await db.collection('problem').find().toArray()
}

const findProblem = async (parent: any, { text }: { text: String }, { db }: { db: Db }) => {
    return await db.collection('problem').find({ title: { $regex: new RegExp(".*" + text) } }).toArray()
}

const findLevelByProblem = async (parent: any, { levels }: { levels: Array<number> }, { db }: { db: Db }) => {
    levels = levels.reverse()
    const returnArr = levels.reduce(async (acc: any, cur) => {
        const problems = await db.collection('problem').find({ lv: String(cur) }).toArray()
        return problems.concat(await acc)
    }, [])
    return returnArr
}

const getRandomProblem = async (parent: any, args: any, { db }: { db: Db }) => {
    const count = await db.collection('problem').estimatedDocumentCount()
    const id = rand(0, count - 1)
    const problem = await db.collection('problem').find().skip(id).limit(1).toArray()
    return problem[0]
}

const getAllProblemCount = async (parent: any, args: any, { db }: { db: Db }) => {
    return await db.collection('problem').estimatedDocumentCount()
}

export { test, getAllProblem, findProblem, findLevelByProblem, getRandomProblem, getAllProblemCount }