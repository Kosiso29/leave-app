import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./Signin.module.scss";

const Signin = (props) => {
    const { email, onAuthVerifyEmail } = props;
    const { Title, Body } = Card;
    const { Group, Control } = Form;

    const navigate = useNavigate();

    const [state, setState] = useState({
        email: '',
        password: '',
        loggedIn: false,
        error: false
    })

    const handleClick = () => {
        const data = {
            userEmail: state.email
        }

        axios.post("/UserLogin", data)
            .then(() => {
                setState({
                    ...state,
                    loggedIn: true,
                    error: false
                })
            })
            .then(() => {
                onAuthVerifyEmail(state.email);
                navigate('/Dashboard');
            })
            .catch(error => {
                setState({ ...state, error: true });
                alert(error);
            })
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
                {/* <Img src="https://picsum.photos/200/50" alt="picsum" /> */}
                <Body>
                    <Title className={classes.title}>Sign loggedIn</Title>
                    <Group className={classes.group}>
                        {/* <Label>Email Address</Label> */}
                        <Control className={classes.control} type="email" placeholder="Your Email" onChange={(e) => { handleChange(e, "email") }} />
                        {/* <Label>Password</Label> */}
                        {/* <Control className={classes.control} type="password" placeholder="Password" onChange={(e) => { handleChange(e, "password") }} /> */}
                        <Button
                            className={classes.button}
                            variant="success"
                            onClick={handleClick}
                        >
                            Login
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