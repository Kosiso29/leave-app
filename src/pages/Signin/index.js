import { Card, Button, Form } from "react-bootstrap";

import classes from "./Signin.module.scss";

const Signin = () => {
    const { Title, Body, Img } = Card; 
    const { Group, Label, Control, Text } = Form;

    return (
        <div className={classes.signin}>
                <Card className={classes.card}>
                    {/* <Img src="https://picsum.photos/200/50" alt="picsum" /> */}
                    <Body>
                        <Title className={classes.title}>Sign in</Title>
                        <Group className={classes.group}>
                            {/* <Label>Email Address</Label> */}
                            <Control className={classes.control} type="email" placeholder="Your Email" />
                            {/* <Label>Password</Label> */}
                            <Control className={classes.control} type="password" placeholder="Password" />
                            <Button className={classes.button} variant="success">Login</Button>
                        </Group>
                    </Body>
                </Card>
        </div>
    )
}

export default Signin;