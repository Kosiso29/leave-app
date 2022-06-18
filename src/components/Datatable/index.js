/* eslint-disable react-hooks/exhaustive-deps */
import { useRef } from "react";
import { Table, Spinner } from "react-bootstrap";

import classes from "./Datatable.module.scss";

const $ = require('jquery');
$.DataTable = require('datatables.net');

const Datatable = (props) => {
    const { show, dataList, columnList, scrollY } = props;

    const tableRef = useRef();

    const jQueryElement = $(tableRef.current);
    jQueryElement.DataTable(
        {
            data: dataList,
            columns: columnList,
            destroy: true,
            scrollX: "100%",
            scrollY: scrollY
        }
    );

    if (show) {

        return (
            <div>
                <Table striped bordered hover responsive className={classes.datatable} ref={tableRef}></Table>
            </div>
        )
    }

    return (
        <div className={classes.spinner}>
            <Spinner animation="border" />
        </div>
    );
}

export default Datatable;