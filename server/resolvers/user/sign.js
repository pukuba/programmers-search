const { ApolloError } = require('apollo-server-express')
const { getToken, deleteToken, checkToken } = require('./auth')
const { uploadStream } = require('../../lib')

const cryptoRandomString = require('crypto-random-string');
const crypto = require('crypto');
const specialChar = "~!@#$%^&*()_+-=`₩[]{},.|;:></?"
const path = require('path')


const checkLength = x => {
    if (x.length < 4) {
        throw new ApolloError("모든 필드의 최소길이는 4입니다.", 412)
    }
    return true
}

const isAlphaNumeric = x => {
    for (const char of x) {
        if (!('a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || '0' <= char && char <= '9')) {
            throw new ApolloError("id 혹은 name이 형식에 맞지 않습니다.", 412)
        }
    }
    return true
}

const isValidPassword = x => {
    for (const char of x) {
        if (!('a' <= char && char <= 'z' || 'A' <= char && char <= 'Z' || '0' <= char && char <= '9' || specialChar.includes(char))) {
            throw new ApolloError("password가 형식에 맞지 않습니다.", 412)
        }
    }
    return true
}

const hashWithSalt = (pw, salt) => crypto.createHash("sha512").update(pw + salt).digest("hex");


module.exports = {
    register: async (parent, { name, id, pw, img }, { token, db }) => {
        checkLength(name), checkLength(id), checkLength(pw)
        isAlphaNumeric(id + name)
        isValidPassword(pw)

        const foundUser = await db.collection('user').findOne({ $or: [{ "name": name }, { "id": id }] })

        if (foundUser) {
            throw new ApolloError("Conflict", 409)
        }

        const salt = cryptoRandomString({ length: 15, type: 'numeric' })
        const user = {
            name,
            id,
            pw: hashWithSalt(pw, salt),
            salt,
            img: "img/default.png"
        }
        const { insertedId } = await db.collection('user').insertOne(user)

        if (img) {
            const image_path = path.join(__dirname, '../../models/img', `${insertedId}.png`)
            const { createReadStream } = await img
            const stream = createReadStream(image_path);
            await uploadStream(stream, image_path)
            await db.collection('user').updateOne({ id }, { $set: { 'img': `img/${insertedId}.png` } })
        }

        return user
    },

    setUser: async (parent, { name, pw, img }, { db, token }) => {
        const user = checkToken(token)
        if (name && checkLength(name) && isAlphaNumeric(name)) {
            await db.collection('user').updateOne({ id: user.id }, { $set: { name } })
        }
        if (pw && checkLength(pw) && isValidPassword(pw)) {
            const salt = cryptoRandomString({ length: 15, type: 'numeric' })
            await db.collection('user').updateOne({ id: user.id }, { $set: { pw: hashWithSalt(pw, salt), salt } })
        }
        if (img) {
            const { insertedId } = db.collection('user').findOne({ id: user.id })
            const image_path = path.join(__dirname, '../../models/img', `${insertedId}.png`)
            const { createReadStream } = await img
            const stream = createReadStream(image_path);
            await uploadStream(stream, image_path)
            await db.collection('user').updateOne({ id: user.id }, { $set: { 'img': `img/${insertedId}.png` } })
        }
        return await db.collection('user').findOne({ id: user.id })
    },

    login: async (parent, { id, pw }, { db, token }) => {
        const user = await db.collection('user').findOne({ 'id': id })
        if (user === null || user.pw !== hashWithSalt(pw, user.salt)) {
            throw new ApolloError("id & pw check", 401)
        }
        return getToken(user.name, db)
    },

    logout: async (parent, { refreshToken }, { db }) => {
        deleteToken(refreshToken, db)
        return true
    },

    findUser: async (parent, { name }, { db }) => {
        return await db.collection('user').findOne({ name: name })
    },
}