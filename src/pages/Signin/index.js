import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./Signin.module.scss";

const Signin = (props) => {
    const { onAuthVerifyEmail } = props;
    const { Title, Body } = Card;
    const { Group, Control } = Form;

    const navigate = useNavigate();

    const [submitted, setSubmitted] = useState(true);
    const [state, setState] = useState({
        email: '',
        loggedIn: false,
        error: false
    })

    const handleClick = async () => {
        setSubmitted(false);
        
        const data = {
            userEmail: state.email
        }

        const microsoftAuthString = await axios.post("/UserLogin", data)
            .then(response => {
                const output = response.data.data;
                setState({
                    ...state,
                    loggedIn: true,
                    error: false
                })
                onAuthVerifyEmail(output.firstName + " " + output.lastName);
                return output.microsoftAuthString;
            })
            .catch(error => {
                setSubmitted(true);
                setState({ ...state, error: true });
                alert(error);
            })
        
        if (microsoftAuthString) {
            axios.post(microsoftAuthString)
                .then(() => {
                    setSubmitted(true);
                })
                .then(() => {
                    navigate('/Dashboard');
                })
                .catch(error => {
                    setSubmitted(true);
                    setState({ ...state, error: true });
                    alert(error);
                })
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
        onAuthVerifyEmail: (email) => dispatch(actions.authVerifyEmail(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);