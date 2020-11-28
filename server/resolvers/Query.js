const { getAllProblem, findProblem, findLevelByProblem} = require('./logic') 
const { myInfo, refreshLogin } = require('./user')

module.exports = {
    test: () => "serverOn",
    getAllProblem,
    findProblem,
    myInfo,
    refreshLogin,
    findLevelByProblem
}