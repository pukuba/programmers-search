const { checkToken } = require('../user')
require('date-utils')

const hljs = require('highlight.js')
const emoji = require('markdown-it-emoji')
const { ApolloError } = require('apollo-server-express')
const md = require('markdown-it')({
    html: false,
    linkify: true,
    typographer: true,
    langPrefix: 'language-',
    quotes: '“”‘’',
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
})
md.use(emoji)

module.exports = {
    createPost: async (parent, { title, problem, type, content }, { db, token }) => {
        const user = checkToken(token)
        if (type === 1 && problem === undefined) {
            throw new ApolloError("args error")
        }
        const result = md.render(content)
        const newDate = new Date()
        const post = {
            author: user.id,
            tier: user.tier,
            title,
            type,
            problem: problem === undefined ? '' : problem,
            content: result,
            date: newDate.valueOf()
        }
        const { insertedId } = await db.collection('post').insertOne(post)
        post.id = insertedId
        return post
    },

    createComment: async (parent, { postId, content }, { db, token }) => {
        const user = checkToken(token)
        const newDate = new Date()
        const comment = {
            author: user.id,
            date: newDate.valueOf(),
            content,
            postId,
            tier: user.tier
        }
        const { insertedId } = await db.collection('user').insertOne(user)
        comment.id = insertedId
        return comment
    }

}