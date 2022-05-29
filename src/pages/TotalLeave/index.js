import { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "../../axios";

import classes from "./TotalLeave.module.scss";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const TotalLeave = (props) => {
    const [show, setShow] = useState(false);

    const tableRef = useRef();

    const seperateDateTime = (data) => {
        if (data) {
            const dateTime = data.split("T");
            const date = dateTime[0];
            const time = dateTime[1];
            const newTime = time.split(".")[0];
    
            return date + " @ " + newTime
        }

        return data;
    }

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
                const tableList = output.data.tList;
                const newTableList = tableList.reduce((arr, table) => {
                    const childArray = [];
                    childArray.push(table.leaveType);
                    childArray.push(seperateDateTime(table.dateCreated));
                    childArray.push(seperateDateTime(table.startDate));
                    childArray.push(seperateDateTime(table.endDate));
                    childArray.push(table.approvedBy);
                    childArray.push(table.comment);
                    childArray.push(table.status);
                    arr.push(childArray);
                    return arr;
                }, [])
                const jQueryElement = $(tableRef.current);
                jQueryElement.DataTable(
                    {
                        data: newTableList,
                        columns: [
                            { title: "Leave Type" },
                            { title: "Date Created" },
                            { title: "Start Date" },
                            { title: "End Date" },
                            { title: "Approved by" },
                            { title: "Comment" },
                            { title: "Status" }
                        ]
                    }
                );
                setShow(true);
            })
            .catch(error => {
                alert(error);
            })
    }, [])

    if (show) {

        return (
            <div>
                <Table striped bordered hover responsive className={classes.total} ref={tableRef}>
                </Table>
            </div>
        )
    }

}

export default TotalLeave;