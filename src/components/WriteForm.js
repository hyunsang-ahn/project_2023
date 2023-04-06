import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "reducers/user";
import _ from 'lodash';
import Draft from 'components/Draft';
import TitleInput from 'components/TitleInput';

import ImgUploader from 'components/ImgUploader';
import { useForm } from "react-hook-form";

const WriteForm = () => {
    const { register, handleSubmit, watch, formState: { errors }, setValue, getValues } = useForm();
    const onSubmit = data => console.log(data);



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