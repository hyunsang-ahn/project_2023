import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
function Header() {
    const [userId, setUserId] = useState(null)
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




    // 가장 메인 div
    const HeaderWraper = styled.div`
    width : 100%;
    height : 30px;
    background-color : green;
    display : flex;
    justify-content : space-between;
    align-items : center

`;


    // 가장 메인 div
    const ImgBox = styled(Link)`
    width : 30px;
    height : 30px;
    background-color : red;

`;
    // 가장 메인 div
    const LinkWrap = styled.div`
    width : 10%;
    height : 30px;
    background-color : yellow;
    display : flex;
    justify-content : flex-start;
    align-items : center;
    gap : 1%;

`;
    // 가장 메인 div
    const LinkBtn = styled(Link)`
    width1 : 40px;
    height : 30px;
    background-color : pink;

`;


    return (
        <HeaderWraper>


            <ImgBox to="/" />
            <LinkWrap >
                {/* 로그인시 헤더 */}
                {!_.isEmpty(userId) && (
                    <>
                        <span>{userId}님 반가워요</span>
                        <LinkBtn to="/Register">
                            글쓰기
                        </LinkBtn>
                        <LinkBtn to="/Register">
                            마이페이지
                        </LinkBtn>
                        <button>로그아웃</button>
                    </>
                )}
                {/* 비로그인시 헤더 */}

                {_.isEmpty(userId) && (
                    <>
                        <LinkBtn to="/Login">
                            로그인
                        </LinkBtn>
                        <LinkBtn to="/Register">
                            회원가입
                        </LinkBtn>
                    </>

                )}


            </LinkWrap >

        </HeaderWraper>
    )
}

export default Header