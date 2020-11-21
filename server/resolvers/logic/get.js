module.exports = {
    getAllProblem: async(parent, args, { db }) => {
        return await db.collection('problem').find().toArray()
    }
}