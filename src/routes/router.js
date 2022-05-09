const express = require("express")
const router = express.Router()
const service = require("../service/users")
const Task = require("../model/task")


router.get("/setupDb", (req, res, next) => {
    service.insert().then((data) => {
        if (data) {
            res.status(200)
            res.json({ message: "Inserted " + data + " document in database" })
        }
    }).catch((err)=>{
        next(err)
    })    
})
router.post("/register",(req,res,next)=>{
    let username = req.body.userName.toLowerCase()
    let password = req.body.password
    service.register(username,password).then((bool)=>{
        if(bool){
            res.status = 200
            res.json({message:"Successfully Registered"})
        }
    }).catch((err)=>{
        next(err)
    })
})

router.post("/login",(req,res,next)=>{
    console.log()
    let username = req.body.userName.toLowerCase()
    let password = req.body.password
    service.login(username,password).then((data)=>{
        if(data){
            res.status = 200
            res.json({message:"Login Successful"})
        }
    }).catch((err)=>{
        next(err)
    })
})

router.put("/addTask",(req,res,next)=>{
    let username = req.body.userName
    let taskObj = new Task(req.body) 
    
    service.addTask(username,taskObj).then((data)=>{
        if(data){
            res.status = 200
            res.send(data)
        }
    }).catch((err)=>{
        next(err)
    })
})


router.put("/deleteIncomplete",(req,res,next)=>{
    let username=req.body.userName
    let task=req.body.taskName
    let date = req.body.date
    
    service.deleteIncomplete(username,task,date).then((data)=>{
        if(data){
            res.status = 200
            res.json(data)
        }
    }).catch((err)=>{
        next(err)
    })
})

router.put("/deleteCompleted",(req,res,next)=>{
    let username=req.body.userName
    let task=req.body.taskName
    let date = req.body.date
    service.deleteCompleted(username,task,date).then((data)=>{
        if(data){
            res.status=200
            res.json(data)
        }
    }).catch((err)=>{
        next(err)
    })
})

router.get("/getTasks/:userName",(req,res,next)=>{
    let username=req.params.userName
    service.getTasks(username).then((data)=>{
        if(data){
            res.status=200
            res.json(data)
        }
    }).catch((err)=>{
        next(err)
    })
})

router.post("/addToCompleted",(req,res,next)=>{
    let username=req.body.userName
    let task=req.body.taskName
    let date = req.body.date

    service.addToCompleted(username,task,date).then((data)=>{
        if(data){
            res.status=200
            res.json(data)
        }
    }).catch((err)=>{
        next(err)
    })
})

module.exports = router