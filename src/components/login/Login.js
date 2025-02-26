import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import axios from 'axios'
import  { Redirect } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            loggedin: false,
            message: ""
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    // validateLoginForm = (e) => {

    //     let errors = {};
    //     const { formData } = this.state;

    //     if (isEmpty(formData.email)) {
    //         errors.email = "Email can't be blank";
    //     // } else if (!isEmail(formData.email)) {
    //     //     errors.email = "Please enter a valid email";
    //     }

    //     if (isEmpty(formData.password)) {
    //         errors.password = "Password can't be blank";
    //     }  else if (isContainWhiteSpace(formData.password)) {
    //         errors.password = "Password should not contain white spaces";
    //     } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
    //         errors.password = "Password's length must between 6 to 16";
    //     }

    //     if (isEmpty(errors)) {
    //         return true;
    //     } else {
    //         return errors;
    //     }
    // }

    logout = (e) => {
        console.log("Logging out...")
        this.setState({
            loggedin: false
        })
    } 

    signUp = (e) => {

            this.setState({
                message: "Signed up successfully, please login"
            })
    }

    login = (e) => {

        e.preventDefault();

        // console.log(e.target[0].value)
        // console.log(e.target[1].value)
        var body = {
            username: e.target[0].value,
            password: e.target[1].value
        }

        console.log(body)

        axios.post("https://8080-salmon-walrus-oydmio7c.ws.trilogy.devspaces.com/api/v1/auth/login/", body).then((response) => {
            console.log(response)
            console.log("Success!!")


            this.setState({
                loggedin: true,
                token: response.data.token,
                username: body.username
            })
            // window.location.reload(false)
            console.log(this.state.loggedin)
            // window.location.replace("/dashboard")
            return generaterows()
        }).catch(err => {
            console.log("Wrong Credentials")
        }) 

        let errors = true;
        // let errors = this.validateLoginForm();

        if(errors === true){
            // alert("You are successfully signed in...");
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }

    }

    redirect = () => {
        if (this.state.loggedin) {
           return <Redirect to={{
                pathname: '/dashboard',
                state: { token: this.state.token }
            }}
        />
        }
        return null
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Row>
                    <Button bsStyle="primary" onClick={ this.state.loggedin ? this.logout : function(){} }> { this.state.loggedin == true ? "Logout" : "Please Login" }</Button>
                    <p id="message"> { this.state.message }</p>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" />
                        { errors.email &&
                            <HelpBlock>{errors.email}</HelpBlock>
                        }
                        </FormGroup>
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" />
                        { errors.password &&
                            <HelpBlock>{errors.password}</HelpBlock>
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary" >Sign-In</Button>
                         
                        <Button bsStyle="primary" display={ this.loggedin ? "none" : "block"} onClick={ this.state.loggedin ? function(){} : this.signUp }> { this.state.loggedin == true ? "Logout" : "Sign Up" }</Button>
                    </form>

                </Row>
            { this.redirect() }
            </div>

        )
    }
}

export default Login;