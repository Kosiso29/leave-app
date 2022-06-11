/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import axios from "../../axios";

import Backdrop from "../../components/Backdrop";
import CreateUser from "../../containers/CreateUser";

import classes from "./AllUsers.module.scss";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const AllUsers = (props) => {
    const [show, setShow] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editData, setEditData] = useState({
        firstName: "",
        lastName: ""
    });

    const tableRef = useRef();

    const handleEdit = (e) => {
        const tableRow = e.target.parentNode.parentNode.children
        const createData = {
            firstName: tableRow[0].textContent,
            lastName: tableRow[1].textContent,
            email: tableRow[2].textContent,
            jobRole: tableRow[3].textContent,
            userType: tableRow[4].textContent,
        }
        setEditData(createData);
        setOpenModal(true);
        // console.log("edit", tableRow[0]);
        // const elementArray = Array.from(e.target.parentNode.parentNode.children);
        // elementArray.forEach(child => {
        //     console.log(child.textContent);
        // })
    }

    useEffect(() => {
        const getData = async () => {
            await new Promise((resolve, reject) => {
                axios.get("/GetAllUsers", {
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
                            childArray.push(table.firstName);
                            childArray.push(table.lastName);
                            childArray.push(table.employeeId);
                            childArray.push(table.jobRole);
                            childArray.push(table.userType);
                            childArray.push(`<button id="ButtonEdit" class="btn btn-primary">Edit</button>`);
                            childArray.push(table.sickLeave);
                            childArray.push(table.remainingSickLeave);
                            childArray.push(table.totalSickLeaveTaken);
                            childArray.push(table.annualLeave);
                            childArray.push(table.remainingAnnualLeave);
                            childArray.push(table.totalAnnualLeaveTaken);
                            arr.push(childArray);
                            return arr;
                        }, [])
                        const jQueryElement = $(tableRef.current);
                        jQueryElement.DataTable(
                            {
                                data: newTableList,
                                columns: [
                                    { title: "First Name" },
                                    { title: "Last Name" },
                                    { title: "Email" },
                                    { title: "Job Role" },
                                    { title: "User Type" },
                                    { title: "Actions" },
                                    { title: "S+" },
                                    { title: "S-" },
                                    { title: "S=" },
                                    { title: "A+" },
                                    { title: "A-" },
                                    { title: "A=" }
                                ]
                            }
                        );
                        setShow(true);
                    })
                    .then(() => {
                        const editButtons = document.querySelectorAll("#ButtonEdit");
                        editButtons.forEach(editButton => {
                            editButton.addEventListener("click", handleEdit);
                        })
                    })
                    .catch(error => {
                        alert(error);
                    })
            })
        }

        getData();
    }, [])

    if (show) {

        return (
            <div>
                <Table striped bordered hover responsive className={classes.users} ref={tableRef}></Table>
                {openModal ?
                    <Backdrop closeModal={() => setOpenModal(false)}>
                        <CreateUser closeModal={() => setOpenModal(false)} editData={editData} />
                    </Backdrop> : null
                }
            </div>
        )
    }

    return (
        <div className={classes.spinner}>
            <Spinner animation="border" />
        </div>
    );
}

export default AllUsers;