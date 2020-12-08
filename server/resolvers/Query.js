const { getAllProblem,
    findProblem,
    findLevelByProblem,
    getRandomProblem,
    getAllPostCount,
    getPageByAllPost,
    getPageProblem,
    getAllProblemCount,
    getProblemByPostCount,
    getPost,
    getCommentCount,
    getPageByComment
} = require('./logic')
const { myInfo, refreshLogin } = require('./user')

module.exports = {
    test: () => "serverOn",
    getAllProblem,
    findProblem,
    myInfo,
    refreshLogin,
    findLevelByProblem,
    getRandomProblem,
    getAllPostCount,
    getPageByAllPost,
    getPageProblem,
    getAllProblemCount,
    getProblemByPostCount,
    getPost,
    getCommentCount,
    getPageByComment
}