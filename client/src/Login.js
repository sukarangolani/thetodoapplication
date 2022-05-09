import React from 'react'
import Axios from "axios"
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            password: "",
            userNameError: "",
            passwordError: "",
            valid: {
                userNameValid:false,
                passwordValid:false
            },
            errorMessage:"",
            formValid: false,
            logIn:false
        }
    }
    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
        this.validator(name,value)
    }
    validator=(name,value)=>{
        let valid=this.state.valid
        switch(name){
            case 'userName':    if(value===""){
                                    this.setState({userNameError:"Username cannot be blank"})
                                    valid.userNameValid=false
                                }
                                else if(!value.match(/^[a-zA-Z]{1,}$/)){
                                    this.setState({ userNameError: "Username can only contain alphabets" })
                                    valid.userNameValid = false
                                }
                                else{
                                    this.setState({userNameError:""})
                                    valid.userNameValid=true
                                }
                                break
            case 'password':    if(value===""){
                                    this.setState({passwordError:"Password cannot be blank"})
                                    valid.passwordValid=false
                                }
                                else{
                                    this.setState({passwordError:""})
                                    valid.passwordValid=true
                                }
                                break
            default: break
        }
        if(valid.passwordValid && valid.userNameValid){
            this.setState({formValid:true})
        }
        else{
            this.setState({formValid:false})
        }
    }


    handleSubmit=(event)=>{
        event.preventDefault()
        let obj = {
            userName : this.state.userName,
            password : this.state.password
        }
        Axios.post("/login",obj).then((response)=>{
            this.setState({logIn:true,errorMessage:""})

        }).catch((error)=>{
            if(error.response){
                this.setState({errorMessage:error.response.data.message,logIn:false})
            }
            else{
                this.setState({errorMessage:"Server Error!",logIn:false})
            }
        })
    }
    render() {
        if(this.state.logIn){
            localStorage.setItem("userName",this.state.userName.toLowerCase())
            return <Redirect to="/todo"></Redirect>
        }
        return <React.Fragment>
            <div className="col-md-4 offset-md-4 mt-3 card bg-light">
                <div className="card-body text-dark">
                    <h4>Login Form</h4>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userName">Username:</label>
                            <input type="text" id="userName" name="userName" onChange={this.handleChange} value={this.state.userName} placeholder="Enter username" className="form-control" />
                            <span className="text-danger">{this.state.userNameError}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userName">Password:</label>
                            <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="Enter password" className="form-control" />
                            <span className="text-danger">{this.state.passwordError}</span>
                        </div>
                        <button className="btn btn-primary btn-block mt-3" disabled={!this.state.formValid} >Login</button>
                        <br></br>
                        {this.state.errorMessage?<span className="text-danger">{this.state.errorMessage}</span>:null}
                    </form>
                </div>
            </div>
        </React.Fragment>
    }
}

export default Login