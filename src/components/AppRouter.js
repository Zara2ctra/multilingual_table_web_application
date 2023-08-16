import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import RecordTable from "../pages/RecordTable";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<RecordTable/>}/>
            <Route path="*" element={<Navigate to={"/"} replace/>}/>
        </Routes>
    );
};

export default AppRouter;