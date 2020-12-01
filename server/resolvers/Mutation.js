const { register, login, setUser, logout } = require('./user')
const { createPost } = require('./logic')
module.exports = {
    register,
    login,
    setUser,
    logout,
    createPost
}