import axios from "../../axios";
import { useEffect, useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import classes from "./CreateLeave.module.scss";

const CreateLeave = ({show}) => {
    const { Title, Body } = Card;
    const { Group, Control, Label, Select } = Form;

    const [state, setState] = useState({
        leaveTypes: [],
        leaveLoaded: false
    });

    const [loaded, setLoaded] = useState(false);
    const [managerEmails, setManagerEmails] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);

    useEffect(() => {
        const getData = async () => {
            await new Promise((resolve, reject) => {
                axios.get("/GetManagers")
                    .then(response => { 
                        console.log(response.data.data);
                        const managers = response.data.data;
                        const managerEmails = [];
                        managers.forEach(manager => {
                            managerEmails.push(manager.email);
                        })
                        setManagerEmails([...managerEmails])
                        console.log(managerEmails);
                        resolve(response);
                    })
                    .catch(error => {
                        alert(error);
                        reject(error);
                    })
            })
            
            await new Promise((resolve, reject) => {
                axios.get("/GetLeaveType")
                .then(response => { 
                    setLeaveTypes([...response.data.data]);
                    setLoaded(true);
                    console.log(response.data.data, state);
                    resolve(response);
                })
                .catch(error => {
                    alert(error);
                    reject(error);
                 })
            })
        }
        
        getData()
    }, [])

    const handleClick = () => {
        const data = {}
        axios.post("/CreateRequest", data)
            .then(() => {

            })
            .catch(error => {
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

    if (!loaded) {
        return <Spinner animation="border" variant="light" />
    }

    return (
        <div className={classes.create}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>Create Leave</Title>
                    <Group className={classes.group}>
                        <Label htmlFor="LeaveType" className={classes.label}>Leave Type</Label>
                        <Select id="LeaveType" className={classes.control} type="text" onChange={(e) => { handleChange(e, "email") }}>
                            {leaveTypes.map(leaveType => (
                                <option>{leaveType}</option>
                            ))}
                        </Select>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="Manager" className={classes.label}>Manager</Label>
                            <Select id="Manager" className={classes.control} type="text" onChange={(e) => { handleChange(e, "email") }}>
                                {managerEmails.map(email => (
                                    <option>{email}</option>
                                ))}
                            </Select>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="LeaveType" className={classes.label}>HR Admin</Label>
                            <Select id="LeaveType" className={classes.control} type="text" placeholder="Leave Type" onChange={(e) => { handleChange(e, "email") }}>
                                {managerEmails.map(email => (
                                    <option>{email}</option>
                                ))}
                            </Select>
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="StartDate" className={classes.label}>Start Date</Label>
                            <Control id="StartDate" className={classes.control} type="datetime-local" placeholder="Start Date" onChange={(e) => { handleChange(e, "email") }} />
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="EndDate" className={classes.label}>End Date</Label>
                            <Control id="EndDate" className={classes.control} type="datetime-local" placeholder="End Date" onChange={(e) => { handleChange(e, "email") }} />
                        </Group>
                    </Group>
                    <Group className={classes.group}>
                        <Label htmlFor="Comment" className={classes.label}>Comment</Label>
                        <Control id="Comment" as="textarea" rows={5} className={classes.control} type="text" placeholder="Comment" onChange={(e) => { handleChange(e, "email") }} />
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