const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const route = require("./Routes/Route")
const app = express()
const PORT = 5000

const BASE_URI = `mongodb+srv://talha185133:StCKt4Fi5qk4T8h5@cluster0.nvzkt0f.mongodb.net/TASK_MANGEMENT_APP`

mongoose.connect(BASE_URI)
    .then(() => console.log("Mongoose Connect"))
    .catch(() => console.log("Mongoose Not Connected"))

app.use(express.json())
app.use(cors())
app.use("/api",route)


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})