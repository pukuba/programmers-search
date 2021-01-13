const config = {
    DB_HOST: process.env.DB_HOST || process.env.DB_HOST1 || "mongodb://localhost:27017/study",
    PORT: process.env.PORT || 8080
}

export default config