const { app } = require("./app")
const { connectDb } = require("./config/db")
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    connectDb()
        .then(() => {
            console.log("Server is running on port 3000")
        })
        .catch(() => {
            process.exit(1)
        })
})
