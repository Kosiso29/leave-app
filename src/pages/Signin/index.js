import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

import classes from "./Signin.module.scss";

const Signin = () => {
    const { Title, Body, Img } = Card;
    const { Group, Label, Control, Text } = Form;

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

        axios.post("http://accrete-001-site1.itempurl.com/api/v1/UserLogin", "gideon.okhakumhe@accreteltd.com")
            .then(response => {
                console.log("response", response);
                setState({
                    ...state,
                    loggedIn: true,
                    error: false
                })
            })
            .then(() => {
                navigate('/Dashboard');
            })
            .catch(error => {
                setState({ ...state, error: true });
                alert(error);
                console.log('error', error)
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
                    <Title className={classes.title}>Sign in</Title>
                    <Group className={classes.group}>
                        {/* <Label>Email Address</Label> */}
                        <Control className={classes.control} type="email" placeholder="Your Email" onChange={(e) => { handleChange(e, "email") }} />
                        {/* <Label>Password</Label> */}
                        <Control className={classes.control} type="password" placeholder="Password" onChange={(e) => { handleChange(e, "password") }} />
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

export default Signin;