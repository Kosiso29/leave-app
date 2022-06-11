import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';

import Backdrop from "../../components/Backdrop";
import CreateLeave from "../../containers/CreateLeave";

import classes from "./ManagerDashboard.module.scss";

const ManagerDashboard = (props) => {
    const { userType } = props;
    const [openModal, setOpenModal] = useState(false)

    const handleClick = () => {
        setOpenModal(true)
    }

    if (userType === "Manager") {
        return (
            <div className={classes.manager}>
                <div className={classes.add}>
                    <Button variant="success" onClick={handleClick}><AddOutlinedIcon />Create User</Button>
                </div>
                {openModal ?
                    <Backdrop closeModal={() => setOpenModal(false)}>
                        <CreateLeave closeModal={() => setOpenModal(false)} />
                    </Backdrop> : null
                }
            </div>
        );
    }


    return null;
}

const mapStateToProps = state => {
    return {
        userData: state.data.userData,
        userType: state.auth.userType
    }
}

export default connect(mapStateToProps)(ManagerDashboard);