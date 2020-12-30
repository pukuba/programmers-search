const { getAllProblem,
    findProblem,
    findLevelByProblem,
    getRandomProblem,
    getAllProblemCount,
} = require('./logic')

module.exports = {
    test: () => "serverOn",
    getAllProblem,
    findProblem,
    findLevelByProblem,
    getRandomProblem,
    getAllProblemCount,
}