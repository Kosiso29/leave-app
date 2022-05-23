import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import classes from "./CreateLeave.module.scss";

const CreateLeave = ({show}) => {
    const { Title, Body } = Card;
    const { Group, Control } = Form;

    const [state, setState] = useState({
        email: '',
        password: '',
        loggedIn: false,
        error: false
    })

    const handleClick = () => {

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
        <div className={classes.create}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>Create Leave</Title>
                    <Group className={classes.group}>
                        <Control className={classes.control} type="email" placeholder="Leave Type" onChange={(e) => { handleChange(e, "email") }} />
                        <Button
                            className={classes.button}
                            variant="success"
                            onClick={handleClick}
                        >
                            Create Leave
                        </Button>
                    </Group>
                </Body>
            </Card>
        </div>
    )
}

export default CreateLeave;