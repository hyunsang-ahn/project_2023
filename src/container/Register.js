import React, { Component } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import InputWithLabel from 'components/Auth/InputWithLabel'

import AuthSubmitButton from 'components/Auth/AuthSubmitButton';


const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const url = "/custom-api/register";
        axios.post(url, { ...data })
            .then(function (response) {
                console.log('response===================', response);
                if (response.data === 'success') {
                    console.log('로그인 성공 메인 페이지로 이동함.')
                    window.location.replace(
                        window.location.host
                    );
                } else {
                    alert('로그인 실패!')
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