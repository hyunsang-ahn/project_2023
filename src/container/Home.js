import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "reducers/user";


const Home = () => {
    const [userId, setUserId] = useState('')


    // dispatch를 사용하기 위한 준비
    const dispatch = useDispatch();

    // store에 접근하여 state 가져오기
    let state = useSelector((state) => { return state })
    console.log(state)  // 콘솔에 store에 저장되어 있던 변수들이 모두 출력된다

    const userChk = () => {
        // store에 있는 state 바꾸는 함수 실행
        dispatch(getUser());
    };
    useEffect(() => {
        userChk()
    }, [])










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
                Swal.fire({
                    title: '로그아웃 성공',
                    text: '페이지를 새로고침합니다.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.reload()
                })
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
