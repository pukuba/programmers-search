const { getAllProblem, findProblem, findLevelByProblem, getRandomProblem} = require('./logic') 
const { myInfo, refreshLogin } = require('./user')

module.exports = {
    test: () => "serverOn",
    getAllProblem,
    findProblem,
    myInfo,
    refreshLogin,
    findLevelByProblem,
    getRandomProblem
}