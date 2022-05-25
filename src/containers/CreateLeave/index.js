import axios from "../../axios";
import { useEffect, useState } from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import classes from "./CreateLeave.module.scss";

const CreateLeave = () => {
    const { Title, Body } = Card;
    const { Group, Control, Label, Select } = Form;

    const [state, setState] = useState({
        leaveTypes: [],
        leaveLoaded: false
    });

    const [loaded, setLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(true);
    const [managerEmails, setManagerEmails] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);

    const [leaveType, setLeaveType] = useState('');
    const [manager, setManager] = useState('');
    const [hrAdmin, setHrAdmin] = useState('');
    const [comment, setComment] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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
                        setManager(managerEmails[0]);
                        setHrAdmin(managerEmails[0]);
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
                    setLeaveType(response.data.data[0]);
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
        setSubmitted(false);

        const data = {
            startDate: startDate,
            endDate: endDate,
            comment: comment,
            leaveType: leaveType,
            manager: manager,
            hrAdmin: hrAdmin,
            employeeEmail: "gideon.okhakumhe@accreteltd.com"
        }

        axios.post("/CreateRequest", data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(error => {
                setSubmitted(true);
                alert(error);
            })
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
                        <Select id="LeaveType" className={classes.control} type="text" onChange={(e) => setLeaveType(e.target.value)} value={leaveType}>
                            {leaveTypes.map(leaveType => (
                                <option>{leaveType}</option>
                            ))}
                        </Select>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="Manager" className={classes.label}>Manager</Label>
                            <Select id="Manager" className={classes.control} type="text" onChange={(e) => setManager(e.target.value)} value={manager}>
                                {managerEmails.map(email => (
                                    <option>{email}</option>
                                ))}
                            </Select>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="LeaveType" className={classes.label}>HR Admin</Label>
                            <Select id="LeaveType" className={classes.control} type="text" onChange={(e) => setHrAdmin(e.target.value)} value={hrAdmin}>
                                {managerEmails.map(email => (
                                    <option>{email}</option>
                                ))}
                            </Select>
                        </Group>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="StartDate" className={classes.label}>Start Date</Label>
                            <Control id="StartDate" className={classes.control} type="datetime-local" placeholder="Start Date" onChange={(e) => setStartDate(e.target.value)} value={startDate}/>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="EndDate" className={classes.label}>End Date</Label>
                            <Control id="EndDate" className={classes.control} type="datetime-local" placeholder="End Date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                        </Group>
                    </Group>
                    <Group className={classes.group}>
                        <Label htmlFor="Comment" className={classes.label}>Comment</Label>
                        <Control id="Comment" as="textarea" rows={5} className={classes.control} type="text" placeholder="Comment" onChange={(e) => setComment(e.target.value)} value={comment} />
                    </Group>
                    <Button
                        className={classes.button}
                        variant="success"
                        onClick={handleClick}
                    >
                        Create Leave
                        {submitted ? null : <Spinner animation="border" className={classes.spinner} />}
                    </Button>
                </Body>
            </Card>
        </div>
    )
}

export default CreateLeave;