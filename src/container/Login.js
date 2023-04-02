import React, { Component } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import InputWithLabel from 'components/Auth/InputWithLabel'
import AuthSubmitButton from 'components/Auth/AuthSubmitButton';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = data => {
        const url = "/custom-api/login";
        axios.post(url, { ...data })
            .then(function (response) {
                if (response.data === 'success') {
                    console.log('로그인 성공 메인 페이지로 이동함.')
                    Swal.fire({
                        title: '로그인 성공',
                        text: '메인페이지로 이동합니다.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        navigate(`/`);
                    })
                    // window.location.replace(
                    //     window.location.host
                    // );
                } else {
                    Swal.fire({
                        title: '로그인 실패',
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
            {/* register your input into the hook by invoking the "register" function */}
            {/* <input {...register("email", { required: true })} /> */}

            {/* include validation with required or other standard HTML validation rules */}
            {/* <input {...register("password", { required: true })} /> */}
            {/* errors will return when field validation fails  */}
            <InputWithLabel
                label={'이메일'}
                register={register}
                name={'email'}


            />
            <InputWithLabel
                label={'이름'}
                register={register}
                name={'password'}


            />
            <AuthSubmitButton
                children={'로그인'}
            />
        </form>
    )
}

export default Login;