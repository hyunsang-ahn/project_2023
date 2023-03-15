import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Home = () => {
    useEffect(() => {
        const url = "/version";
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
            Home
        </div>
    )
}

export default Home
