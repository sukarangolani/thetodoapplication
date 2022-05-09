import React from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            userName: "",
            password: "",
            cpassword: "",
            userNameError: "",
            passwordError: "",
            cpasswordError: "",
            valid: {
                userNameValid: false,
                passwordValid: false,
                cpasswordValid: false
            },
            formValid: false,
            successMessage:"",
            errorMessage:""
        }
    }
    handleChange = (event) => {
        let name = event.target.name
        let value = event.target.value
        this.setState({ [name]: value })
        this.validator(name, value)
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let obj={
            userName:this.state.userName,
            password:this.state.password
        }
        Axios.post("/register",obj).then((response)=>{
            this.setState({successMessage:response.data.message,errorMessage:""})
        }).catch((error)=>{
            if(error.response){
                this.setState({errorMessage:error.response.data.message,successMessage:""})
            }
            else{
                this.setState({errorMessage:"Server Error!",successMessage:""})
            }
            
        })
    }
    validator = (name, value) => {
        let valid = this.state.valid
        switch (name) {
            case 'userName': if (value === "") {
                this.setState({ userNameError: "Username cannot be blank" })
                valid.userNameValid = false
            }
            else if(!value.match(/^[a-zA-Z]{1,}$/)){
                this.setState({ userNameError: "Username can only contain alphabets" })
                valid.userNameValid = false
            }
            else {
                this.setState({ userNameError: "" })
                valid.userNameValid = true
            }
                break
            case 'password': if (value === "") {
                this.setState({ passwordError: "Password cannot be blank" })
                valid.passwordValid = false
            }
            else {
                this.setState({ passwordError: "" })
                valid.passwordValid = true
            }
                break
            case 'cpassword': if (value === "") {
                this.setState({ cpasswordError: "Confirm Password cannot be blank" })
                valid.cpasswordValid = false
            }
            else if (value !== this.state.password) {
                this.setState({ cpasswordError: "Password is not same" })
                valid.cpasswordValid = false
            }
            else {
                this.setState({ cpasswordError: "" })
                valid.cpasswordValid = true
            }
                break

            default: break
        }
        if (valid.cpasswordValid && valid.passwordValid && valid.userNameValid) {
            this.setState({ formValid: true })
        }
        else {
            this.setState({ formValid: false })
        }
    }
    render() {
        return <React.Fragment>
            <div className="col-md-4 offset-md-4 mt-3 card bg-light">
                <div className="card-body text-dark">
                    <h4>Sign Up Form</h4>
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
                        <div className="form-group">
                            <label htmlFor="userName">Confirm Password:</label>
                            <input type="password" id="cpassword" name="cpassword" onChange={this.handleChange} value={this.state.cpassword} className="form-control" />
                            <span className="text-danger">{this.state.cpasswordError}</span>
                        </div>
                        <button className="btn btn-primary btn-block mt-3" disabled={!this.state.formValid}>Register</button>
                        <br/>
                        {this.state.errorMessage?<span className="text-danger">{this.state.errorMessage}</span>:null}
                        {this.state.successMessage?<div><span className="text-success">{this.state.successMessage}!</span> <Link to="/login">Click here</Link> to log in</div>:null}
                    </form>
                </div>
            </div>
        </React.Fragment>
    }
}

export default Register