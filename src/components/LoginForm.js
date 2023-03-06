
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
const LoginForm = () => {
    const [loginStatus, setLoginStatus] = useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    useEffect(() => {
        loginChk()
    }, [])


    const onSubmit = async (formData) => {

        console.log('formData=============================', formData)
        try {
            const response = await axios.post('/api/login', {

                ...formData
            })

            if (response.data === "") {
                console.log("비로그인 상태입니다.")

            } else {
                console.log("로그인 상태입니다.")
                setLoginStatus(true)

            }    
            } catch (err) {
            console.log("Error >>", err);
        }
    }
    const loginChk = async () => {

        try {
            const response = await axios.get('/api/loginChk')

            console.log("response >>", response.data)
            if (response.data === "") {
                console.log("비로그인 상태입니다.")

            } else {
                console.log("로그인 상태입니다.")
                setLoginStatus(true)

            }
        } catch (err) {
            console.log("Error >>", err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input  {...register("userId", { required: true })} />
                {errors.id && <span>This field is required</span>}
            </div>

            <div>
                <input {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}
            </div>


            <input type="submit" />
            {loginStatus && <button>로그아웃하기</button>}
        </form>
    );
}


export default LoginForm;






