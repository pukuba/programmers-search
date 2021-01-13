import { Problem } from '../models/Types'

const Problem = {
    id: (parent: Problem) => parent._id
}

export { Problem }