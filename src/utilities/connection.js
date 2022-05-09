const mongoose = require = require("mongoose")
mongoose.Promise = global.Promise
const Schema = mongoose.Schema
mongoose.set("useCreateIndex", true)

let schema = {
    "userName":{
        type: String,
        required: true,
        match:/^[a-zA-Z]{1,}$/,
        unique: true
    },

    "password":{
        type: String,
        required: true
    },

    "incompleteTasks":{
        type:[{
            "name": {
                type: String,
                required:true
            },
                   
            "date": {
                type: Date,
                required:true,
                default: new Date()
            }
        }],
        default:[]
    },
    "completedTasks":{
        type:[{
            "name": {
                type: String,
                required:true
            },
                   
            "date": {
                type: Date,
                required: true,
                default: new Date()
            }
        }],
        default:[]
    }


}

let userSchema = new Schema(schema,{collection:"Users",timestamps:true})

let connection = {}

connection.getCollection = ()=>{
    return mongoose.connect("mongodb://localhost:27017/ToDoDB", { useNewUrlParser: true,useUnifiedTopology: true}).then((db)=>{

        return db.model("Users",userSchema)
    }).catch((err)=>{
        console.log(err.message)

        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    })
}

module.exports = connection