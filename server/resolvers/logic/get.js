const { rand } = require('../../lib')

module.exports = {
    getAllProblem: async (parent, args, { db }) => {
        return await db.collection('problem').find().toArray()
    },
    findProblem: async (parent, { text }, { db }) => {
        const resultArr = await db.collection('problem').find({ title: { $regex: new RegExp(".*" + text) } }).toArray()
        return resultArr
    },
    findLevelByProblem: async (parent, { levels }, { db }) => {
        levels = levels.reverse()
        const returnArr = levels.reduce(async (acc, cur) => {
            const problems = await db.collection('problem').find({ lv: String(cur) }).toArray()
            return problems.concat(await acc)
        }, [])

        return returnArr
    },
    getRandomProblem: async (parent, _, { db }) => {
        const count = await db.collection('problem').estimatedDocumentCount()
        const id = rand(0, count - 1) + ""
        const problem = await db.collection('problem').findOne({ id })
        return problem
    },
    getPagePost: async (parent, { page }, { db }) => {
        const left = (page - 1) * 20
        //const posts = await db.collection('post').find({ id: { "$gt": left, "$lte": right } }).toArray()
        const posts = await db.collection('post').find().sort({ _id: -1 }).skip(left).limit(20).toArray()
        return posts
    },
    getAllPostCount: async (parent, args, { db }) => {
        return await db.collection('post').estimatedDocumentCount()
    }
}