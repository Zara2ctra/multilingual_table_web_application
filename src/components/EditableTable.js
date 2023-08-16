import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const EditableTable = observer(({columns, rows}) => {
    const [rowsState, setRowsState] = useState(rows);

    useEffect(() => {
        setRowsState(rows);
    }, [rows]);

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                {columns.map((column) => (
                    <th key={column.field}>{column.fieldName}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rowsState.map((row) => (
                <tr>
                    <td>{row.index}</td>
                    <td>{row.id}</td>
                    <td>{row.fullName}</td>
                    <td>{row.address}</td>
                    <td>{row.phone_number}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
});

export default EditableTable;

