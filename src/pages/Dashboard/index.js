import { useState } from "react";
import { Button } from "react-bootstrap";

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
            <CreateLeave show={openModal} />
        </div>
    );
}

export default Dashboard;