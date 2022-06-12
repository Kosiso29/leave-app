import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner, } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./Signin.module.scss";

const Signin = (props) => {
    const { onAuthVerifyEmail, onAlertUpdate, onUpdateUserDashboard } = props;
    const { Title, Body } = Card;
    const { Group, Control } = Form;

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(true);
  
    const [state, setState] = useState({
        email: '',
        loggedIn: false,
        error: false,
        message: "",
        alertColor: ""
    })

    const handleClick = async () => {
        setSubmitted(false);
        
        const data = {
            userEmail: state.email
        }

        const microsoftAuthString = await axios.post("/UserLogin", data)
            .then(response => {
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Login Successful"
                })
                setSubmitted(true);
                const output = response.data.data;
                setState({
                    ...state,
                    loggedIn: true,
                    error: false
                })
                if (output.userType === "User" && output.jobRole === "Human Resource") {
                    onAuthVerifyEmail(output.employeeId, output.firstName + " " + output.lastName, "HR");
                } else {
                    onAuthVerifyEmail(output.employeeId, output.firstName + " " + output.lastName, output.userType);
                }
                onUpdateUserDashboard({
                    ...output
                })

                return output;
            })
            .then(data => {
                if (data.userType === "Manager" || data.jobRole === "Human Resource") {
                    navigate('/manager-dashboard');
                } else {
                    navigate('/dashboard');
                }

                return data.microsoftAuthString;
            })
            .catch(error => {
                setSubmitted(true);
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                });
                setState({
                    ...state,
                    error: true
                });
            })
        
        if (microsoftAuthString) {
            window.open(microsoftAuthString, "_blank");
        }
    }

    const handleChange = (e, input) => {
        if (input === "email") {
            setState({
                ...state,
                email: e.target.value
            })
        }

        if (input === "password") {
            setState({
                ...state,
                password: e.target.value
            })
        }
    }

    return (
        <div className={classes.signin}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>Sign In</Title>
                    <Group className={classes.group}>
                        <Control className={classes.control} type="email" placeholder="Your Email" onChange={(e) => { handleChange(e, "email") }} />
                        <Button
                            className={classes.button}
                            variant="success"
                            onClick={handleClick}
                        >
                            Login
                            {submitted ? null : <Spinner animation="border" className={classes.spinner} />}
                        </Button>
                    </Group>
                </Body>
            </Card>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthVerifyEmail: (email, userId, userType) => dispatch(actions.authVerifyEmail(email, userId, userType)),
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState)),
        onUpdateUserDashboard: (userData) => dispatch(actions.updateUserDashboard(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);