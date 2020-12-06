const { getAllProblem, findProblem, findLevelByProblem, getRandomProblem, getPagePost, getAllPostCount, getPageProblem, getAllProblemCount } = require('./get')
const { createPost } = require('./create')

module.exports = {
    getAllProblem,
    findProblem,
    findLevelByProblem,
    getRandomProblem,
    createPost,
    getPagePost,
    getAllPostCount,
    getPageProblem,
    getAllProblemCount
}