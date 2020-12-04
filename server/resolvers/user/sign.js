const { ApolloError } = require('apollo-server-express')
const { getToken, deleteToken, checkToken } = require('./auth')
const { uploadStream } = require('../../lib')

const cryptoRandomString = require('crypto-random-string')
const crypto = require('crypto')
const specialChar = "~!@#$%^&*()_+-=`₩[]{},.|;:></?"
const path = require('path')
const axios = require("axios")

const checkLength = x => {
    if (!x || x.length < 4) return false
    return true
}

const isAlphaNumeric = x => {
    for (const char of x) {
        if (!('a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || '0' <= char && char <= '9')) {
            return false
        }
    }
    return true
}

const isValidPassword = x => {
    for (const char of x) {
        if (!('a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || '0' <= char && char <= '9' || specialChar.includes(char))) {
            return false
        }
    }
    return true
}

const hashWithSalt = (pw, salt) => crypto.createHash("sha512").update(pw + salt).digest("hex");

const getAPI = async (name) => {
    const solvedAC = await axios({
        url: process.env.SolvedAPI + name
    })
    return solvedAC.data.level
}

const getTier = (level) => {
    if (level === undefined || level === 0) return 'U'
    if (level < 6) return 'B' + (6 - level)
    if (level < 11) return 'S' + (11 - level)
    if (level < 16) return 'G' + (16 - level)
    if (level < 21) return 'P' + (21 - level)
    if (level < 26) return 'D' + (26 - level)
    return 'R' + (31 - level)
}

module.exports = {
    register: async (parent, { id, pw, img, bojId }, { db }) => {
        if (!checkLength(id) || !checkLength(pw)) {
            throw new ApolloError("모든 필드의 최소길이는 4입니다.", 412)
        }
        if (!isAlphaNumeric(id)) {
            throw new ApolloError("id가 형식에 맞지 않습니다.", 412)
        }
        if (!isValidPassword(pw)) {
            throw new ApolloError("password가 형식에 맞지 않습니다.", 412)
        }

        const foundUser = await db.collection('user').findOne({ id: id })
        // await db.collection('user').findOne({ $or: [{ "name": name }, { "id": id }] })  
        if (foundUser) {
            throw new ApolloError("Conflict", 409)
        }

        const salt = cryptoRandomString({ length: 15, type: 'numeric' })

        const user = {
            id,
            pw: hashWithSalt(pw, salt),
            salt,
            bojId: bojId === undefined ? '' : bojId,
            tier: getTier(await getAPI(bojId)),
            img: "img/default.png",
        }
        const { insertedId } = await db.collection('user').insertOne(user)

        if (img) {
            const imagePath = path.join(__dirname, '../../models/img', `${insertedId}.png`)
            const { createReadStream } = await img
            const stream = createReadStream(imagePath);
            await uploadStream(stream, imagePath)
            await db.collection('user').updateOne({ id: user.id }, { $set: { 'img': `img/${insertedId}.png` } })
        }

        return user
    },

    setUser: async (parent, { pw, img, bojId }, { db, token }) => {
        const user = checkToken(token)
        if (pw) {
            if (checkLength(pw)) {
                throw new ApolloError("비밀번호의 길이가 3 이하입니다.", 412)
            }
            if (isValidPassword(pw)) {
                throw new ApolloError("비밀번호가 형식에 맞지 않습니다.", 412)
            }
            const salt = cryptoRandomString({ length: 15, type: 'numeric' })
            await db.collection('user').updateOne({ id: user.id }, { $set: { pw: hashWithSalt(pw, salt), salt } })
        }
        if (bojId) {
            const level = await getAPI(bojId)
            await db.collection('user').updateOne({ id: user.id }, { $set: { bojId, tier: getTier(level) } })
        }
        if (img) {
            const { insertedId } = await db.collection('user').findOne({ id: user.id })
            const imagePath = path.join(__dirname, '../../models/img', `${insertedId}.png`)
            const { createReadStream } = await img
            const stream = createReadStream(imagePath);
            await uploadStream(stream, imagePath)
            await db.collection('user').updateOne({ id: user.id }, { $set: { 'img': `img/${insertedId}.png` } })
        }
        const updateUser = await db.collection('user').findOne({ id: user.id })
        return getToken(updateUser.id, updateUser.tier, db)
    },

    login: async (parent, { id, pw }, { db, token }) => {
        const user = await db.collection('user').findOne({ id: id })
        if (user === null || user.pw !== hashWithSalt(pw, user.salt)) {
            throw new ApolloError("id & pw check", 401)
        }
        await db.collection('token').deleteMany({ id })
        return getToken(user.id, user.tier, db)
    },

    logout: async (parent, { refreshToken }, { db }) => {
        deleteToken(refreshToken, db)
        return true
    },

    findUser: async (parent, { id }, { db }) => {
        return await db.collection('user').findOne({ id })
    },

    myInfo: async (parent, args, { db, token }) => {
        const user = checkToken(token)
        const result = await db.collection('user').findOne({ id: user.id })
        return result
    }
}