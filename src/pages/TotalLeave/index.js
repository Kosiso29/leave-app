import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../axios";

import classes from "./TotalLeave.module.scss";

const TotalLeave = (props) => {
    const [state, setState] = useState({
        data: []
    })
    useEffect(() => {
        axios.get("/GetAllRequest", {
            params: {
                pageNumber: 1,
                pageSize: 10
            }
        })
            .then(response => {
                return response.data;
            })
            .then(output => {
                setState({ data: output.data.tList })
            })
            .catch(error => {
                alert(error);
            })
    }, [])

    return (
        <div>
            <Table striped bordered hover className={classes.total}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Leave Type</th>
                        <th>Date Created</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Approved by</th>
                        <th>Comment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.leaveType}</td>
                            <td>{row.dateCreated}</td>
                            <td>{row.startDate}</td>
                            <td>{row.endDate}</td>
                            <td>{row.approvedBy}</td>
                            <td>{row.comment}</td>
                            <td>{row.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default TotalLeave;