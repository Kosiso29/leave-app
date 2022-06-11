import { useState } from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import { connect } from "react-redux";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import Backdrop from "../../components/Backdrop";
import CreateLeave from "../../containers/CreateLeave";

import classes from "./Dashboard.module.scss";

const Dashboard = (props) => {
    const { userData } = props;
    const [openModal, setOpenModal] = useState(false)

    const { Item } = ListGroup;

    const listData = [
        { body: "Number of Sick Leaves taken", variant: "warning", userData: userData.sickLeave },
        { body: "Number of Sick Leaves remaining", variant: "warning", userData: userData.remainingSickLeave },
        { body: "Total number of Sick Leaves", variant: "warning", userData: userData.totalSickLeaveTake },
        { body: "Number of Annual Leaves taken", variant: "primary", userData: userData.annualLeave },
        { body: "Number of Annual Leaves remaining", variant: "primary", userData: userData.remainingAnnualLeave },
        { body: "Total number of Annual Leaves", variant: "primary", userData: userData.totalAnnualLeaveTaken },
    ]

    const handleClick = () => {
        setOpenModal(true)
    }

    return (
        <div className={classes.dashboard}>
            <div className={classes.add}>
                <Button variant="success" onClick={handleClick}><AddOutlinedIcon />Create Leave</Button>
            </div>
            <ListGroup className={classes.list}>
                {listData.map((list, index) => (
                    <Item key={index} className={classes.item}>{list.body}<Badge className={classes.badge} bg={list.variant}>{list.userData || 0}</Badge></Item>
                ))}
            </ListGroup>
            {openModal ?
                <Backdrop closeModal={() => setOpenModal(false)}>
                    <CreateLeave closeModal={() => setOpenModal(false)} />
                </Backdrop> : null
            }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.data.userData
    }
}

export default connect(mapStateToProps)(Dashboard);