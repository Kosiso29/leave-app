/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Table, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import axios from "../../axios";

import classes from "./PendingRequests.module.scss";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const PendingRequests = (props) => {
    const { email, userType, onAlertUpdate } = props;
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

    const handleApprove = (e) => {
        const button = e.target;
        button.children[0].classList.remove("pending-request-spinner-hide");
        const data = {
            leaveRequestId: button.dataset.id,
            managerEmail: email
        };
        axios.post("/ApproveRequest", data)
            .then(() => {
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Approved"
                })
                button.children[0].classList.add("pending-request-spinner-hide");
            })
            .catch(error => {
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                });
                button.children[0].classList.add("pending-request-spinner-hide");
            })
    }

    const handleReject = (e) => {
        const button = e.target;
        button.children[0].classList.remove("pending-request-spinner-hide");
        const data = {
            leaveRequestId: button.dataset.id,
            managerEmail: email
        };
        axios.post("/RejectRequest", data)
            .then(() => {
                onAlertUpdate({
                    show: true,
                    variant: "success",
                    message: "Rejected"
                })
                button.children[0].classList.add("pending-request-spinner-hide");
            })
            .catch(error => {
                const errorMessage = error.response.data.error.message;
                onAlertUpdate({
                    show: true,
                    variant: "danger",
                    message: errorMessage
                });
                button.children[0].classList.add("pending-request-spinner-hide");
            })
    }

    const createButton = (text, id, variant, tableId) => {
        return `
            <button id="${id}" data-id="${tableId}" class="btn btn-${variant} pending-request-button">
                ${text}
                <div class="spinner-border text-light pending-request-spinner pending-request-spinner-hide" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
            </button>`
    }

    useEffect(() => {
        axios.get("/GetAllPendingRequests", {
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
                    childArray.push(table.comment);
                    childArray.push(table.status);
                    if (userType === "Manager") {
                        childArray.push(createButton("Approve ", "ApproveButton", "success", table.id));
                        childArray.push(createButton("Reject ", "RejectButton", "danger", table.id));
                    }
                    arr.push(childArray);
                    return arr;
                }, [])
                const jQueryElement = $(tableRef.current);
                jQueryElement.DataTable(
                    {
                        data: newTableList,
                        columns: userType === "Manager" ? [
                            { title: "Leave Type" },
                            { title: "Date Created" },
                            { title: "Start Date" },
                            { title: "End Date" },
                            { title: "Comment" },
                            { title: "Status" },
                            { title: "Approve" },
                            { title: "Reject" }
                        ] : [
                            { title: "Leave Type" },
                            { title: "Date Created" },
                            { title: "Start Date" },
                            { title: "End Date" },
                            { title: "Comment" },
                            { title: "Status" },
                        ]
                    }
                );
                setShow(true);
            })
            .then(() => {
                const approveButtons = document.querySelectorAll("#ApproveButton");
                approveButtons.forEach(approveButton => {
                    approveButton.addEventListener("click", handleApprove);
                })
                const rejectButtons = document.querySelectorAll("#RejectButton");
                rejectButtons.forEach(rejectButton => {
                    rejectButton.addEventListener("click", handleReject);
                })
            })
            .catch(error => {
                alert(error);
            })
    }, [])

    if (show) {

        return (
            <div>
                <Table striped bordered hover responsive className={classes.total} ref={tableRef}>
                {/* <table className={classes.total + " table table-striped table-bordered hover"} ref={tableRef}></table> */}
                </Table>
            </div>
        )
    }

    return (
        <div className={classes.spinner}>
            <Spinner animation="border" />
        </div>
    );
}

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        userType: state.auth.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAlertUpdate: (alertState) => dispatch(actions.alertUpdate(alertState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequests);