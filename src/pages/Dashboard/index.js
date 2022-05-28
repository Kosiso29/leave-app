import { useState } from "react";
import { Button, ListGroup, Badge } from "react-bootstrap";
import Backdrop from "../../components/Backdrop";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import CreateLeave from "../../containers/CreateLeave";

import classes from "./Dashboard.module.scss";

const Dashboard = (props) => {
    const [openModal, setOpenModal] = useState(false)

    const { Item } = ListGroup;

    const handleClick = () => {
        setOpenModal(true)
    }

    return (
        <div className={classes.dashboard}>
            <div className={classes.add}>
                <Button variant="success" onClick={handleClick}><AddOutlinedIcon />Create Leave</Button>
            </div>
            <ListGroup className={classes.list}>
                <Item className={classes.item}>Number of Sick Leaves taken <Badge className={classes.badge} bg="warning">2</Badge></Item>
                <Item className={classes.item}>Number of Sick Leaves remaining <Badge className={classes.badge} bg="warning">3</Badge></Item>
                <Item className={classes.item}>Total number of Sick Leaves <Badge className={classes.badge} bg="warning">5</Badge></Item>
                <Item className={classes.item}>Number of Annual Leaves taken <Badge className={classes.badge} bg="primary">5</Badge></Item>
                <Item className={classes.item}>Number of Annual Leaves remaining <Badge className={classes.badge} bg="primary">20</Badge></Item>
                <Item className={classes.item}>Total number of Annual Leaves <Badge className={classes.badge} bg="primary">25</Badge></Item>
            </ListGroup>
            {openModal ?
                <Backdrop closeModal={() => setOpenModal(false)}>
                    <CreateLeave closeModal={() => setOpenModal(false)} />
                </Backdrop> : null
            }
        </div>
    );
}

export default Dashboard;