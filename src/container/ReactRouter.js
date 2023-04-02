import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './Home';
import Register from './Register';
import Login from './Login';
import NotFound from './NotFound';
import { getUser } from "reducers/user";

function ReactRouter() {
    // dispatch를 사용하기 위한 준비
    const dispatch = useDispatch();

    // store에 접근하여 state 가져오기
    let state = useSelector((state) => { return state })
    console.log('ReactRouter=================', state)
    // 콘솔에 store에 저장되어 있던 변수들이 모두 출력된다


    useEffect(() => {
        dispatch(getUser());
    }, [])


    return (

        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>

        </>
    )
}

export default ReactRouter