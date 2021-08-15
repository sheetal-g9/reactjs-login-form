import React, { Component } from "react";
import { Row, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './dashboard.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import axios from 'axios'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.location.state.token)
        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false, // Indicates in progress state of login form
            loggedin: false,
            message: "",
            token: this.props.location.state.token
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
            window.location.replace("/page")

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

    generateTable = () => {
        return (
           

            )
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Dashboard">
                <Row>
                    <div className="container">
                    <h1>    Token : {this.state.token}</h1>
                     <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody id="bodytable">

                            { this.generateRows() }
                        
                      </tbody>
                    </table>   
                  </div>
                </Row>
            </div>
        )
    }
}

export default Dashboard;