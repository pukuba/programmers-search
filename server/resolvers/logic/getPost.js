

module.exports = {
    getProblemByPostCount: async (parent, { problemId }, { db }) => {
        const problems = await db.collection('post').find({ problemId }).estimatedDocumentCount()
        return problems
    },
    getPageByAllPost: async (parent, { page }, { db }) => {
        const left = (page - 1) * 20
        const posts = await db.collection('post').find().sort({ _id: -1 }).skip(left).limit(20).toArray()
        return posts
    },
    getAllPostCount: async (parent, args, { db }) => {
        return await db.collection('post').estimatedDocumentCount()
    },
    getPost: async (parent, { id }, { db }) => {
        return await db.collection('post').findOne({ _id: id })
    },
    getCommentCount: async (parent, { postId }, { db }) => {
        return await db.collection('comment').find({ postId }).estimatedDocumentCount()
    },
    getPageByComment: async (parent, { page, postId }, { db }) => {
        const left = (page - 1) * 20
        const comments = await db.collection('comment').find({ postId }).sort({ _id: -1 }).skip(left).limit(20).toArray()
        return comments
    },

}