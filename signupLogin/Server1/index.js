const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const userModel = require("./Model/userSchema")
const Middlewares = require("./Middlewares/AuthMiddleware")
const app = express()
const PORT = 5000

const BASE_URI = `mongodb+srv://talha185133:StCKt4Fi5qk4T8h5@cluster0.nvzkt0f.mongodb.net/SignupLogin`

mongoose.connect(BASE_URI)
    .then(() => console.log("Mongoose Connect"))
    .catch(() => console.log("Mongoose Not Connected"))

app.use(express.json())

// app.use("/")

// testing API

app.get("/api/post", Middlewares.AUTH_MIDDLEWARE, (req, res) => {
    res.send({
        message: "Middlewares"
    })
})
app.get("/api/check", (req, res) => {
    res.send({
        message: "Check API All ok"
    })
})

const DB = [
    {
        id: 1,
        name: "ali",
        class: 3
    },
    {
        id: 2,
        name: "talha",
        class: 9
    },
    {
        id: 3,
        name: "umer",
        class: 6
    }
]

// app.post("/api/user", (req, res) => {
//     const body = req.body
//     res.json({
//         status: true,
//         message: "User Created successfully",
//         data: body
//     })
// })

app.get("/api/user", (req, res) => {
    let { name } = req.query;
    name = name.toLowerCase()

    let filteredReaponse = DB.filter((user) => (
        user.name === name
    ))
    if (filteredReaponse.length > 0) {
        res.json({
            status: true,
            message: "User Created successfully",
            data: { ...filteredReaponse[0] }
        })
    } else {
        res.json({
            status: false,
            message: "User user not found",
        })
    }
})



// ===========CRUD API==========
app.post("/api/user", (req, res) => {
    // const body = req.body
    const { name, email, password, mobileNumber } = req.body

    if (!name || !email || !password || !mobileNumber) {
        res.json({
            status: false,
            message: "Missing field are required"
        })
        return
    }

    const objToSend = {
        name,
        email,
        password,
        phone: mobileNumber
    }

    userModel.create(objToSend)
        .then((data) => {
            res.json({
                status: true,
                message: 'Data added Successfully',
                data: data
            })
        }).catch((error) => {
            res.json({
                status: false,
                message: 'interval server error',
            })
        })
})

// =========== Authentication ========================



app.post("/api/signup", (req, res) => {
    const { name, email, password, mobileNumber } = req.body

    if (!name || !email || !password || !mobileNumber) {
        res.json({
            status: false,
            message: "Missing field are required"
        })
        return
    }

    userModel.findOne({ email })
        .then(async (response) => {
            if (response) {
                res.json({
                    message: "Email Already use"
                })
                return
            } else {

                // ==== password hashing ======
                let encryptedPassword = await bcrypt.hash(password, 10)
                // ==== password hashing ======
                const objToSend = {
                    name,
                    email,
                    password: encryptedPassword,
                    phone: mobileNumber
                }

                userModel.create(objToSend)
                    .then((data) => {
                        res.json({
                            status: true,
                            message: `welcome ${name}`,
                            data: data
                        })
                    }).catch((error) => {
                        res.json({
                            status: false,
                            message: 'interval server error',
                        })
                    })
            }
        })
        .catch((error) => console.log(error))
})

app.post("/api/login", (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.json({
            status: false,
            message: "Missing field are required"
        })
        return
    }

    userModel.findOne({ email })
        .then(async (response) => {
            if (!response) {
                res.json({
                    message: "Email not found"
                })
                return
            } else {
                let isPasswordMatch = await bcrypt.compare(password, response.password)
                if (!isPasswordMatch) {
                    res.json({
                        message: "Invalid Password and Username"
                    })
                } else {

                    const objToSend = {
                        ...response
                    }
                    const token = JWT.sign(objToSend,"isUserLogin")
                    res.json({
                        message: `${response.name} Login Successfully!`,
                        token:token
                    })
                }
            }
        })
        .catch((error) => console.log(error))
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})