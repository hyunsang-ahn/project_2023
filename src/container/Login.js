import React, { Component } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';


const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const url = "/custom-api/login";
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
            {/* register your input into the hook by invoking the "register" function */}
            <input {...register("email", { required: true })} />

            {/* include validation with required or other standard HTML validation rules */}
            <input {...register("password", { required: true })} />
            {/* errors will return when field validation fails  */}

            <button type="submit" >로그인</button>
        </form>
    )
}

export default Login;