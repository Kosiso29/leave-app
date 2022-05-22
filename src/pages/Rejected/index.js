import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../axios";

const Rejected = (props) => {
    const [state, setState] = useState({
        data: {}
    })
    useEffect(() => {
        axios.get("/GetAllRequest")
            .then(response => {
                return response.data;
            })
            .then(output => {
                setState({ data: output.data })
                // console.log(output.data);
            })
            .catch(error => {
                alert(error);
                console.log('error', error)
            })
    }, [])

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Leave Type</th>
                        <th>Date Created</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Rejected by</th>
                        <th>Comment</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Rejected;