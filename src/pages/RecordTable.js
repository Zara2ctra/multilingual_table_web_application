import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Form, Row} from "react-bootstrap";
import InfiniteScroll from 'react-infinite-scroll-component';
import EditableTable from "../components/EditableTable.js";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import _random from 'lodash/random';
import {CSVLink} from "react-csv";
import {MistakeGenerator} from "../table/Mistake";
import {generateHash} from "../utils/generateHash"


const RecordTable = observer(() => {
    const {user} = useContext(Context);
    const [rows, setRows] = useState([]);
    const [mistake, setMistake] = useState(0);
    const [seed, setSeed] = useState(42);
    const [hasMore, setHasMore] = useState(true);


    const handleRandomSeed = () => {
        user.setZeroListId()
        setSeed(_random(0, 100000))
    }

    const handleChangeMistake = (event) => {
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue)) {
            setMistake(newValue);
        }
        user.setZeroListId()
    };

    const handleChangeSeed = (event) => {
        user.setZeroListId()
        const newValue = parseFloat(event.target.value);
        if (!isNaN(newValue)) {
            setSeed(newValue);
        }
    };


    function getRecords(numberOfRecords, seed, numberOfMistakes) {
        return range(numberOfRecords).map((item, index) => {
            return recordList(seed + index, user, numberOfMistakes)
        })
    }

    function range(numberOfRecords) {
        const arr = [];
        for (let i = 0; i < numberOfRecords; i++) {
            arr.push(i)
        }
        return arr;
    }

    function recordList(seed, user, numberOfMistakes) {
        user.faker.seed(seed);
        let record = {
            index: user.listId,
            fullName: user.faker.person.fullName(),
            address: `${user.faker.location.state()} ,${user.faker.location?.city()}, ${user.faker.location.streetAddress()}`,
            phone_number: user.faker.phone.number(),
        }
        record.id = generateHash(record);
        if (numberOfMistakes) {
            const mistakeGenerator = new MistakeGenerator(record, numberOfMistakes, user.faker, user.lang);
            mistakeGenerator.randomMistakeSelection();
        }
        return record;
    }

    const fetchAll = () => {
        const data = getRecords(50, seed, mistake)
        setRows(data);
    };

    const fetchMoreData = () => {
        const newData = getRecords(10, seed + rows.length, mistake);
        setRows(prevData => [...prevData, ...newData]);
    };


    useEffect(() => {
        fetchAll();
    }, [user.lang, seed, mistake]);


    const columns = [
        {field: 'index', fieldName: 'index'},
        {field: 'id', fieldName: 'id'},
        {field: 'fullName', fieldName: 'Full Name'},
        {field: 'address', fieldName: 'Address'},
        {field: 'phone_number', fieldName: 'Phone Number'},
    ];

    const CSVColumns = [
        {key: 'index', label: 'index'},
        {key: 'id', label: 'id'},
        {key: 'fullName', label: 'Full Name'},
        {key: 'address', label: 'Address'},
        {key: 'phone_number', label: 'Phone Number'},
    ];

    return (
        <>
            <Form>
                <Form.Group as={Row} className="ms-5 mt-3 mb-3 d-flex justify-content-center align-items-center">
                    <Col xs="2">
                        <Form.Range
                            style={{width: "300px", background: "black", borderRadius: "75%"}}
                            value={mistake}
                            size="lg"
                            min="0"
                            max="10"
                            variant={"outline-danger"}
                            step={0.25}
                            tooltip='off'
                            onChange={e => {
                                user.setZeroListId()
                                return setMistake(e.target.value)
                            }}
                        />
                    </Col>
                    <Col xs="1" className="ms-3">
                        <Form.Control
                            type="text"
                            value={mistake}
                            size='s'
                            onChange={handleChangeMistake}
                        />
                    </Col>
                    <Col xs="1">
                        <Button variant="outline-dark" onClick={handleRandomSeed}>Random Seed</Button>
                    </Col>
                    <Col xs="1">
                        <Form.Control
                            type="text"
                            value={seed}
                            size='s'
                            onChange={handleChangeSeed}
                        />
                    </Col>
                    <Col xs="1">
                        <CSVLink
                            data={rows}
                            headers={CSVColumns}
                            filename={"my-file.csv"}
                            onClick={() => {
                            }}
                        >
                            Download CSV
                        </CSVLink>
                    </Col>
                </Form.Group>
            </Form>
            <InfiniteScroll
                dataLength={rows.length}
                next={fetchMoreData}
                hasMore={hasMore}
                endMessage={<p>No more items to load</p>}
            >
                <EditableTable columns={columns} rows={rows}/>
            </InfiniteScroll>
        </>
    )
        ;
});

export default RecordTable;
