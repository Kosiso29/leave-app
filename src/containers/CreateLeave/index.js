import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import classes from "./CreateLeave.module.scss";

const CreateLeave = ({show}) => {
    const { Title, Body } = Card;
    const { Group, Control, Label } = Form;

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
                        <Label className={classes.label}>Name</Label>
                        <Control className={classes.control} type="text" placeholder="Name" onChange={(e) => { handleChange(e, "email") }} />
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label className={classes.label}>Position</Label>
                            <Control className={classes.control} type="text" placeholder="Position" onChange={(e) => { handleChange(e, "email") }} />
                        </Group>
                        <Group className={classes.group}>
                            <Label className={classes.label}>Leave Type</Label>
                            <Control className={classes.control} type="text" placeholder="Leave Type" onChange={(e) => { handleChange(e, "email") }} />
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label className={classes.label}>Start Date</Label>
                            <Control className={classes.control} type="text" placeholder="Start Date" onChange={(e) => { handleChange(e, "email") }} />
                        </Group>
                        <Group className={classes.group}>
                            <Label className={classes.label}>End Date</Label>
                            <Control className={classes.control} type="text" placeholder="End Date" onChange={(e) => { handleChange(e, "email") }} />
                        </Group>
                    </Group>
                    <Group className={classes.group}>
                        <Label className={classes.label}>Comment</Label>
                        <Control className={classes.control} type="text" placeholder="Comment" onChange={(e) => { handleChange(e, "email") }} />
                    </Group>
                        <Button
                            className={classes.button}
                            variant="success"
                            onClick={handleClick}
                        >
                            Create Leave
                        </Button>
                </Body>
            </Card>
        </div>
    )
}

export default CreateLeave;