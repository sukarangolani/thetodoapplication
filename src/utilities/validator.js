validator = {}

validator.userAndPass=(username,password)=>{
    if(username==="" && password===""){
        let error = new Error("Username and Password cannot be blank")
        error.status = 400
        throw error       
    }
    else if(username===""){
        let error = new Error("Username cannot be blank")
        error.status = 400
        throw error
    }
    else if(password===""){
        let error = new Error("Password cannot be blank")
        error.status = 400
        throw error
    }
}

module.exports = validator