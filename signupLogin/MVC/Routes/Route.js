const express = require("express")
const Middlewares = require("../Middlewares/AuthMiddleware")
const Controllers = require("../Controllers/Controllers")
const route = express.Router()


// route.get("/api/addToCart", Middlewares.AUTH_MIDDLEWARE,Controllers.addToCart )
route.get("/check", Controllers.check)

// =========== Authentication ========================

route.post("/signup", Controllers.signUp)
route.post("/login", Controllers.login)

// =========== Task Mangement API ========================

route.get("/tasks", Middlewares.AUTH_MIDDLEWARE, Controllers.getTask)
route.post("/addTask", Middlewares.AUTH_MIDDLEWARE, Controllers.addTask)
route.put("/task", Middlewares.AUTH_MIDDLEWARE, Controllers.updateTask)
route.delete("/tasks/:id", Middlewares.AUTH_MIDDLEWARE, Controllers.deleteTask)


module.exports = route