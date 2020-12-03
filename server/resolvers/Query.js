const { getAllProblem, findProblem, findLevelByProblem, getRandomProblem, getAllPostCount, getPagePost } = require('./logic')
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
    getPagePost
}