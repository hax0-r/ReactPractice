const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const userModel = require("../Model/userSchema")
const taskModel = require("../Model/taskSchema")

const Controllers = {
    check: (req, res) => {
        res.send({
            message: "Check API All ok"
        })
    },

    signUp: (req, res) => {
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
    },

    login: (req, res) => {
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
                        const token = JWT.sign(objToSend, "isUserLogin")
                        res.json({
                            message: `${response.name} Login Successfully!`,
                            token: token
                        })
                    }
                }
            })
            .catch((error) => console.log(error))
    },

    addToCart:(req, res) => {
        res.send({
            message: "Middlewares"
        })
    },

    // =========Task============

    addTask: (req, res) => {
        const { title, description, status } = req.body;
        if (!title || !description || !status) {
            res.json({
                message: "Required Field are missing !"
            })
            return
        }
    
        // send data on db
        const objToSend = {
            title,
            description,
            status,
        }
    
        taskModel.create(objToSend)
            .then((response) => {
                res.json({
                    status: true,
                    message: "Task Added Successfully !",
                    data: response
                })
            })
            .catch((err) => {
                res.json({
                    status: false,
                    message: "Internal Server Error !"
                })
            })
    
    },

    getTask:(req, res) => {
        const findQuery = { };
    
        taskModel.find(findQuery)
            .then((response) => {
                res.json({
                    status: true,
                    message: "Tasks Fetches Successfully !",
                    data: response
                })
            })
            .catch((err) => {
                res.json({
                    status: false,
                    message: "Internal Server Error !"
                })
            })
    },

    updateTask: (req, res) => {
        const { id, ...updatedData } = req.body
        taskModel.findByIdAndUpdate(id, updatedData, { new: true })
            .then((response) => {
                res.json({
                    status: true,
                    message: "Task updated Successfully !",
                    data: response
                })
            })
            .catch((err) => {
                res.json({
                    status: false,
                    message: "Internal Server Error !"
                })
            })
    },

    deleteTask: (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.json({
                message: "Id is required !"
            })
            return
        }
        // sending to db
        taskModel.findByIdAndDelete(id)
            .then((response) => {
                console.log('response:- ', response)
                res.json({
                    status: true,
                    message: "task Deleted Successfully !",
                    data: response
                })
            })
            .catch((err) => {
                console.log(err)
                res.json({
                    status: false,
                    message: "Internal Server Error !"
                })
            })
    }
}

module.exports = Controllers;