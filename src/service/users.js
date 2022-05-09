const model = require("../model/users")
const validator = require("../utilities/validator")

let service = {}

service.insert = () => {
    return model.insert().then((data) => {
        return data
    })
}



service.register = (username, password) => {
    validator.userAndPass(username, password)
    return model.doUserExist(username).then((data) => {
        if (data) {
            let error = new Error("This username already exists!")
            error.status = 400
            throw error
        }
        else {
            return model.register(username, password).then((bool) => {
                if (bool) {
                    return true
                }

                else {
                    let error = new Error("Cannot Register!")
                    error.status = 400
                    throw error
                }
            })
        }
    })
}

service.login = (username, password) => {
    validator.userAndPass(username, password)
    return model.doUserExist(username).then((data1) => {
        if (!data1) {
            let error = new Error("You need to register first!")
            error.status = 400
            throw error
        }
        else {
            return model.login(username, password).then((data2) => {
                if (data2) {
                    return data2
                }
                else {
                    let error = new Error("Incorrect login credentials!")
                    error.status = 400
                    throw error
                }
            })
        }
    })
}

service.addTask = (username, taskObj) => {
    return model.addTask(username, taskObj).then((data) => {
        if (data) {
            return data
        }

        else {
            let error = new Error("Task cannot be added!")
            error.status = 400
            throw error
        }
    })
}

service.deleteIncomplete = (username, task, date) => {
    return model.deleteIncomplete(username, task, date).then((data) => {
        if (data) {
            return data
        }
        else {
            let error = new Error("Task cannot be deleted!")
            error.status = 400
            throw error
        }
    })
}

service.deleteCompleted = (username, task, date) => {
    return model.deleteCompleted(username, task, date).then((data) => {
        if (data) {
            return data
        }
        else {
            let error = new Error("Task cannot be deleted!")
            error.status = 400
            throw error
        }
    })
}

service.getTasks = (username) => {
    return model.getTasks(username).then((data) => {
        if (data !== null) {
            return data
        }
        else {
            let error = new Error("User not found!")
            error.status = 404
            throw error
        }
    })
}

service.addToCompleted = (username, task, date) => {
    return model.addToCompleted(username,task,date).then((data) => {
        if (data) {
            return data
        }
        else {
            let error = new Error("Task not found!")
            error.status = 400
            throw error
        }
    })
}

module.exports = service