import { useState } from "react";
import { Button } from "react-bootstrap";
import Backdrop from "../../components/Backdrop";

import CreateLeave from "../../containers/CreateLeave";

const Dashboard = (props) => {
    const [openModal, setOpenModal] = useState(false)
    const handleClick = () => {
        setOpenModal(true)
    }
    return (
        <div>
            Dashboard
            <Button variant="success" onClick={handleClick}>+ Create Leave</Button>
            {openModal ?
                <Backdrop closeModal={() => setOpenModal(false)}>
                    <CreateLeave closeModal={() => setOpenModal(false)} />
                </Backdrop> : null
            }
        </div>
    );
}

export default Dashboard;