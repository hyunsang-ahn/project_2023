import React, { useState, useEffect } from 'react';
import axios from 'axios';




const Home = () => {
    const [userId, setUserId] = useState('')
    useEffect(() => {
        const url = "/custom-api/loginChk";
        axios.get(url)
            .then(function (response) {
                console.log('response======================', response);
                if (response.data.userId) {
                    setUserId(response.data.userId)
                }
            })
            .catch(function (error) {
                console.log("실패");
            })


    }, [])

    const LogOut = () => {
        const url = "/custom-api/logout";
        axios.get(url)
            .then(function (response) {
                console.log('logout======================', response);

            })
            .catch(function (error) {
                console.log("실패");
            })


    }
    return (
        <div>
            여긴 홈 컴폰너트

            {userId !== '' &&
                <>
                    <span>반갑습니다 {userId}님</span>
                    <button onClick={LogOut}>로그아웃</button>
                </>
            }
        </div>
    )
}

export default Home
