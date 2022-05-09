import React from 'react'
import { Redirect } from "react-router-dom"
import Axios from "axios"

class Todo extends React.Component {
    constructor() {
        super()
        this.state = {
            task: "",
            taskError: "",
            formValid: false,
            errorMessage: "",
            logOut: false,
            taskObj: {
                incompleteTasks: [],
                completedTasks: []
            }
        }
    }

    componentDidMount() {
        let userName = localStorage.getItem("userName")
        Axios.get("/getTasks/" + userName).then((response) => {
            this.setState({ taskObj: response.data, errorMessage: "" })
        }).catch((err) => {
            let taskObj2 = {
                incompleteTasks: [],
                completedTasks: []
            }
            if (err.response) {
                this.setState({ errorMessage: "Some Error Occured", taskObj: taskObj2 })

            }
            else {
                this.setState({ errorMessage: "Server Error!", taskObj: taskObj2 })
            }
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.value === "") {
            this.setState({ taskError: "Task cannot be blank", formValid: false })
        }
        else {
            this.setState({ taskError: "", formValid: true })
        }
    }

    handleTask = (task) => {

        let obj = {
            userName: localStorage.getItem("userName"),
            taskName: task
        }

        Axios.put("/addTask", obj).then((response) => {
            this.setState({ taskObj: response.data, task:"",formValid:false})
        }).catch((err) => {
            let taskObj2 = {
                incompleteTasks: [],
                completedTasks: []
            }
            if (err.response) {

                this.setState({ errorMessage: "Some Error Occured", taskObj: taskObj2 })
            }
            else {
                this.setState({ errorMessage: "Server Error!", taskObj: taskObj2 })
            }
        })

    }



    handleAddTask = (item) => {

        let obj = {
            userName: localStorage.getItem("userName"),
            taskName: item.name,
            date: item.date
        }
        Axios.post("/addToCompleted", obj).then((response) => {
            this.setState({ taskObj: response.data, errorMessage: "" })
        }).catch((err) => {
            let taskObj2 = {
                incompleteTasks: [],
                completedTasks: []
            }
            if (err.response) {

                this.setState({ errorMessage: "Some Error Occured", taskObj: taskObj2 })

            }
            else {
                this.setState({ errorMessage: "Server Error!", taskObj: taskObj2 })
            }
        })
    }

    handleDeleteIncomplete = (item) => {
        let obj = {
            userName: localStorage.getItem("userName"),
            taskName: item.name,
            date: item.date
        }
        Axios.put("/deleteIncomplete", obj).then((response) => {
            this.setState({ taskObj: response.data, errorMessage: "" })
        }).catch((err) => {
            let taskObj2 = {
                incompleteTasks: [],
                completedTasks: []
            }
            if (err.response) {

                this.setState({ errorMessage: "Some Error Occured", taskObj: taskObj2 })

            }
            else {
                this.setState({ errorMessage: "Server Error!", taskObj: taskObj2 })
            }
        })
    }

    handleDeleteCompleted = (item) => {
        let obj = {
            userName: localStorage.getItem("userName"),
            taskName: item.name,
            date: item.date
        }
        Axios.put("/deleteCompleted", obj).then((response) => {
            this.setState({ taskObj: response.data, errorMessage: "" })
        }).catch((err) => {
            let taskObj2 = {
                incompleteTasks: [],
                completedTasks: []
            }
            if (err.response) {

                this.setState({ errorMessage: "Some Error Occured", taskObj: taskObj2 })

            }
            else {
                this.setState({ errorMessage: "Server Error!", taskObj: taskObj2 })
            }
        })
    }

    handleLogOut = () => {
        this.setState({ logOut: true })
    }

    render() {
        if (this.state.logOut) {
            //localStorage.removeItem("userName")
            localStorage.clear()
            return <Redirect to="/"></Redirect>
        }

        else if (!(localStorage.getItem("userName"))) {
            return <Redirect to="/"></Redirect>
        }

        return <React.Fragment>

            <div className="container-fluid">

                <h1 className="display-4 text-light text-center">Welcome back  {localStorage.getItem("userName")}</h1>

                <br /><br /><br />
                <div className="col-md-4 offset-md-4 card bg-light">
                    <div className="card-body">
                        <div className="input-group">
                            <input type="text" id="task" name="task" onChange={this.handleChange} className="form-control" placeholder="Enter the task to be completed" value={this.state.task} />
                            <button disabled={!this.state.formValid} className="col-md-3 ml-1 btn btn-danger" onClick={() => { this.handleTask(this.state.task) }}>Add</button>
                        </div>
                        <span className="text-danger">{this.state.taskError}</span>
                    </div>
                </div>
            </div>

            <br /><br />

            {this.state.errorMessage?<h1 className="text-center text-light">{this.state.errorMessage}</h1>:
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-5 offset-md-1 card">
                        <div className="card-body">
                            <h5>Incomplete Tasks</h5>

                            {this.state.taskObj.incompleteTasks.length > 0 ?
                                <div className="table-responsive"><table className="table table-responsive">

                                    {this.state.taskObj.incompleteTasks.map((item, index) =>
                                        <tbody key={index}>
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                                <td><button className="btn btn-success" onClick={() => { this.handleAddTask(item) }}>Complete</button></td>
                                                <td><button className="btn btn-danger" onClick={() => { this.handleDeleteIncomplete(item) }}>Delete</button></td>
                                            </tr>
                                        </tbody>)}
                                </table></div> : <div><br></br><p className="text-success">You don't have any incomplete Task!</p></div>}






                        </div>

                    </div>



                    <div className="col-md-4 offset-md-1 card">
                        <div className="card-body">
                            <h5>Completed Tasks</h5>
                            {this.state.taskObj.completedTasks.length > 0 ?
                                <div className="table-responsive"><table className="table">
                                    {this.state.taskObj.completedTasks.map((item, index) =>
                                        <tbody key={index}>
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                                <td><button className="btn btn-danger" onClick={() => { this.handleDeleteCompleted(item) }}>Delete</button></td>
                                            </tr>
                                        </tbody>)}


                                </table></div> : <div><br></br><p className="text-danger">No Task is completed yet!</p></div>}
                        </div>
                    </div>
                </div>
            </div>
                }

    

                <br /><br />
            <div className="container-fluid">
                <div className="text-center">
                    <button className="btn btn-warning btn-lg" onClick={this.handleLogOut}>Log Out</button>
                </div>
            </div>
        </React.Fragment>
    }
}


export default Todo