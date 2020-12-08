const { getAllProblem, findProblem, findLevelByProblem, getRandomProblem, getPageProblem, getAllProblemCount } = require('./getProblem')
const { createPost } = require('./create')
const { getPageByAllPost, getAllPostCount, getProblemByPostCount, getPost, getCommentCount, getPageByComment } = require('./getPost')

module.exports = {
    getAllProblem,
    findProblem,
    findLevelByProblem,
    getRandomProblem,
    createPost,
    getPageByAllPost,
    getAllPostCount,
    getPageProblem,
    getAllProblemCount,
    getProblemByPostCount,
    getPost,
    getCommentCount,
    getPageByComment
}