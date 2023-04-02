import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "reducers/user";
import _ from 'lodash';


const Home = () => {
    const [userId, setUserId] = useState('')
    const user = useSelector((state) => { return state.user })
    const LogOut = () => {
        const url = "/custom-api/logout";
        axios.get(url)
            .then(function (response) {
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

            {!_.isEmpty(user) &&
                <>
                    <span>반갑습니다 {_.get(user, 'name')}님</span>
                    <button onClick={LogOut}>로그아웃</button>
                </>
            }
        </div>
    )
}

export default Home
