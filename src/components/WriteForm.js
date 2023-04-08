import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { getUser } from "reducers/user";
import _ from 'lodash';
import Draft from 'components/Draft';
import TitleInput from 'components/TitleInput';

import ImgUploader from 'components/ImgUploader';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";



const WriteForm = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm();
    const navigate = useNavigate();
    const user = useSelector((state) => { return state.user })

    const onSubmit = async (formData) => {

        console.log('formData===================', formData)
        const {
            title = '',
            upload_img_id = [],
            description = '',
        } = formData
        const response = await axios.post('/custom-api/BoardWrite', { ...formData, user })

        console.log('response===================', response)
        const status = _.get(response, 'status')
        if (status === 200) {
            Swal.fire({
                title: '게시글 입력 성공',
                text: '게시글 목록으로 이동합니다.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate(`/BoardList`);

            })
        }
    }



    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            <TitleInput

                register={register}
                setValue={setValue}
            />
            <Draft

                register={register}
                setValue={setValue}
            />
            <ImgUploader

                register={register}
                setValue={setValue}
            />
            <button>저장하기</button>
        </form>



    )
}

export default WriteForm