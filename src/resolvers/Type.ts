import { Problem } from "config/Types"

const Problem = {
    id: (parent: Problem) => parent._id
}

export { Problem }