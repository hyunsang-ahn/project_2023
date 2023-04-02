import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from 'axios';
import _ from 'lodash';
import { useSelector, useDispatch } from "react-redux";
function Header() {

    const user = useSelector((state) => { return state.user })




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
            <LinkWrap>
                {/* 로그인시 헤더 */}
                {!_.isEmpty(user) && (
                    <>
                        <span>{_.get(user, 'name')}님 반가워요</span>
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

                {_.isEmpty(user) && (
                    <>
                        <LinkBtn to="/Login">
                            로그인
                        </LinkBtn>
                        <LinkBtn to="/Register">
                            회원가입
                        </LinkBtn>
                    </>

                )}


            </LinkWrap>

        </HeaderWraper>
    )
}

export default Header