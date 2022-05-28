import axios from "../../axios";
import { useEffect, useState } from "react";
import { Card, Form, Button, Spinner, CloseButton } from "react-bootstrap";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import classes from "./CreateLeave.module.scss";

const CreateLeave = (props) => {
    const { email: loginEmail, closeModal, onAlertUpdate } = props;
    const { Title, Body } = Card;
    const { Group, Control, Label, Select } = Form;

    const [loaded, setLoaded] = useState(false);
    const [submitted, setSubmitted] = useState(true);
    const [managerEmails, setManagerEmails] = useState([]);
    const [hrAdminEmails, setHrAdminEmails] = useState([]);
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
                        const managers = response.data.data;
                        const managerEmails = [];
                        managers.forEach(manager => {
                            managerEmails.push(manager.email);
                        })
                        setManagerEmails([...managerEmails])
                        setManager(managerEmails[0]);
                        setHrAdmin(managerEmails[0]);
                        resolve(response);
                    })
                    .catch(error => {
                        const errorMessage = error.response.data.error.message;
                        onAlertUpdate({
                            show: true,
                            variant: "danger",
                            message: errorMessage
                        })
                        reject(errorMessage);
                    })
            })

            await new Promise((resolve, reject) => {
                axios.get("/GetHrAdmin")
                    .then(response => { 
                        const hrAdmins = response.data.data;
                        const hrAdminEmails = [];
                        hrAdmins.forEach(manager => {
                            hrAdminEmails.push(manager.email);
                        })
                        setHrAdminEmails([...hrAdminEmails])
                        setHrAdmin(hrAdminEmails[0]);
                        resolve(response);
                    })
                    .catch(error => {
                        const errorMessage = error.response.data.error.message;
                        onAlertUpdate({
                            show: true,
                            variant: "danger",
                            message: errorMessage
                        })
                        reject(errorMessage);
                    })
            })
            
            await new Promise((resolve, reject) => {
                axios.get("/GetLeaveType")
                .then(response => { 
                    setLeaveTypes([...response.data.data]);
                    setLeaveType(response.data.data[0]);
                    setLoaded(true);
                    resolve(response);
                })
                .catch(error => {
                    const errorMessage = error.response.data.error.message;
                    onAlertUpdate({
                        show: true,
                        variant: "danger",
                        message: errorMessage
                    })
                    reject(errorMessage);
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
            employeeEmail: loginEmail
        }

        axios.post("/CreateRequest", data)
            .then(() => {
                setSubmitted(true);
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Leave Created"
                })
            })
            .catch(error => {
                setSubmitted(true);
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                })
            })
    }

    const handleClose = () => {
        closeModal();
    }

    if (!loaded) {
        return <Spinner animation="border" variant="light" />
    }

    return (
        <div className={classes.create}>
            <Card className={classes.card}>
                <Body>
                    <Title className={classes.title}>Create Leave</Title>
                    <CloseButton className={classes.close} onClick={handleClose} />
                    <Group className={classes.group}>
                        <Label htmlFor="LeaveType" className={classes.label}>Leave Type</Label>
                        <Select id="LeaveType" className={classes.control} type="text" onChange={(e) => setLeaveType(e.target.value)} value={leaveType}>
                            {leaveTypes.map((leaveType, index) => (
                                <option key={index}>{leaveType}</option>
                            ))}
                        </Select>
                    </Group>
                    <Group className={classes.groups}>
                        <Group className={classes.group}>
                            <Label htmlFor="Manager" className={classes.label}>Manager</Label>
                            <Select id="Manager" className={classes.control} type="text" onChange={(e) => setManager(e.target.value)} value={manager}>
                                {managerEmails.map((email, index) => (
                                    <option key={index} >{email}</option>
                                ))}
                            </Select>
                        </Group>
                        <Group className={classes.group}>
                            <Label htmlFor="LeaveType" className={classes.label}>HR Admin</Label>
                            <Select id="LeaveType" className={classes.control} type="text" onChange={(e) => setHrAdmin(e.target.value)} value={hrAdmin}>
                                {hrAdminEmails.map((email, index) => (
                                    <option key={index}>{email}</option>
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

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLeave);