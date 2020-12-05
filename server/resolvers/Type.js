module.exports = {
    Post: {
        id: parent => parent._id
    },
    Comment: {
        id: parent => parent._id
    },
    Problem: {
        id: parent => parent._id
    }
}