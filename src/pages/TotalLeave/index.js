import { useEffect, useState } from "react";
import axios from "../../axios";

import Datatable from "../../components/Datatable";
import { seperateDateTime } from "../../utils/separateDateTime";

const TotalLeave = () => {
    const [show, setShow] = useState(false);
    const [dataList, setDataList] = useState(false);
    const [columnList, setColumnList] = useState(false);

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
                const newDataList = tableList.reduce((arr, table) => {
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
                }, []);
                const newColumnList = [
                    { title: "Leave Type" },
                    { title: "Date Created" },
                    { title: "Start Date" },
                    { title: "End Date" },
                    { title: "Approved by" },
                    { title: "Comment" },
                    { title: "Status" }
                ];
                setDataList(newDataList);
                setColumnList(newColumnList);
                setShow(true);
            })
            .catch(error => {
                alert(error);
            })
    }, [])

    return <Datatable show={show} dataList={dataList} columnList={columnList} scrollY="60vh" />
}

export default TotalLeave;