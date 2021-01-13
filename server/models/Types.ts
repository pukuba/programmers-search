import { ObjectId } from 'mongodb'

interface Problem {
    _id: ObjectId,
    title: String,
    lv: String,
    url: String,
    tag: String,
    description: String
}

export { Problem }