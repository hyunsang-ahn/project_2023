import React, { Component } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import InputWithLabel from 'components/Auth/InputWithLabel'

import AuthSubmitButton from 'components/Auth/AuthSubmitButton';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const url = "/custom-api/register";
        axios.post(url, { ...data })
            .then(function (response) {
                if (response.data === 'success') {
                    Swal.fire({
                        title: '회원가입 성공',
                        text: '로그인 페이지로 이동합니다.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        navigate(`/login`);
                    })
                    // window.location.replace(
                    //     window.location.host
                    // );
                } else {
                    Swal.fire({
                        title: '회원가입 실패',
                        text: '아이디와 비밀번호를 다시 확인해주세요',
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(function (error) {
                console.log('error===================', error);
            })
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>

            <InputWithLabel
                label={'이메일'}
                register={register}
                name={'email'}


            />
            <InputWithLabel
                label={'이름'}
                register={register}
                name={'name'}


            />
            <InputWithLabel
                label={'패스워드'}
                register={register}
                name={'password'}


            />
            <InputWithLabel
                label={'패스워드 확인'}
                register={register}
                name={'password_chk'}


            />



            <AuthSubmitButton
                children={'회원가입'}
            />
        </form>
    )
}

export default Register;