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
        let returnArr = []
        for (const level of levels) {
            const problem = await db.collection('problem').find({ lv: String(level) }).toArray()
            returnArr = returnArr.concat(problem)
        }
        return returnArr
    },
    getRandomProblem: async (parent, _, { db }) => {
        const problems = await db.collection('problem').find().toArray()
        const randomIndex = rand(0,problems.length - 1)
        return problems[randomIndex]
    }
}