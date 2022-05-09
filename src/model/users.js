const initialData = require("./users.json")
const collection = require("../utilities/connection")

let model = {}

model.insert=()=>{
    return collection.getCollection().then((collection)=>{
        return collection.deleteMany().then((data)=>{
            return collection.insertMany(initialData).then((documents)=>{
                if(documents && documents.length>0){
                    return documents.length
                }
                else{
                    let error = new Error("Insertion failed")
                    error.status = 500
                    throw error
                }
            })
        })
    })
}

model.doUserExist=(username)=>{
    return collection.getCollection().then((collection)=>{
        return collection.findOne({userName:username}).then((data)=>{
            if(data){
                return true
            }
            else{
                return false
            }
        })
    })

}

model.register=(username,password)=>{
    return collection.getCollection().then((collection)=>{
        return collection.create({userName:username,password:password}).then((data)=>{
            if(data){
                return true
            }
            else{
                return false
            }
        })
    })
}

model.login=(username,password)=>{
    return collection.getCollection().then((collection)=>{
        return collection.findOne({userName:username,password:password}).then((data)=>{
            if(data){
                return data
            }
            else{
                return false
            }
        })
    })
}

model.addTask=(username,taskObj)=>{
    return collection.getCollection().then((collection)=>{
        // let taskObj = {"name":task,"date":new Date()}
        return collection.updateOne({userName:username},{$push:{"incompleteTasks":taskObj}}).then((data)=>{
            if(data.nModified>0){
                return model.getTasks(username).then((data)=>{
                    if(data){
                        return data
                    }
                    else{
                        return null
                    }
                })
            }
            else{
               return null
            }
        })
    })
}

model.deleteIncomplete=(username,task,date)=>{
    return collection.getCollection().then((collection)=>{
        return collection.updateOne({userName:username},{$pull:{incompleteTasks:{name:task,date:new Date(date)}}}).then((data)=>{
            if(data.nModified>0){
                return model.getTasks(username).then((data)=>{
                    if(data){
                        return data
                    }
                    else{
                        return null
                    }
                })
            }
            else{
                return null
            }
        })
    })
}

model.deleteCompleted=(username,task,date)=>{
    return collection.getCollection().then((collection)=>{
        return collection.updateOne({userName:username},{$pull:{completedTasks:{name:task,date:new Date(date)}}}).then((data)=>{
            if(data.nModified>0){
                return model.getTasks(username).then((data)=>{
                    if(data){
                        return data
                    }
                    else{
                        return null
                    }
                })
            }
            else{
                return null
            }
        })
    })
}

model.getTasks=(username)=>{
    return collection.getCollection().then((user)=>{
        return user.findOne({userName:username},{_id:0,incompleteTasks:1,completedTasks:1}).then((data)=>{
            if(data){
                return data
            }
            else{
                return null
            }
        })
    })
}

model.addToCompleted=(username,task,date)=>{
    return model.deleteIncomplete(username,task,date).then((data)=>{
        return collection.getCollection().then((collection)=>{
            let taskObj={
                name:task,
                date:new Date()
            }
            return collection.updateOne({userName:username},{$push:{"completedTasks":taskObj}}).then((data)=>{
                if(data.nModified>0){
                   return model.getTasks(username).then((data)=>{
                       if(data){
                           return data
                       }
                       else{
                           return null
                       }
                   })
                }
                else{
                   return null
                }
            })
        })
    })
}

module.exports = model