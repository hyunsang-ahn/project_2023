import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Home = () => {
    useEffect(() => {
        const url = "/custom-api";
        axios.get(url)
            .then(function (response) {
                console.log("성공");
            })
            .catch(function (error) {
                console.log("실패");
            })


    }, [])
    return (
        <div>
            여긴 홈 컴폰너트
        </div>
    )
}

export default Home
