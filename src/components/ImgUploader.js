import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "reducers/user";
import _ from 'lodash';
import Draft from 'components/Draft';
import ImageUploading from 'react-images-uploading';


const ImgUploader = ({
    register,
    setValue
}) => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        imageList.forEach(async (item, index) => {
            const formData = new FormData();

            formData.append('multipartFiles', _.get(item, 'file'));
            const response = await axios.post('/custom-api/uploadImage', formData)
            console.log('response===================', response)
            const id = _.get(response, 'data.insertedId')
            setValue(`upload_img_id[${index}]`, id)
        });



    };
    return (


        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
        >
            {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
            }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        Click or Drop here
                    </button>
                    &nbsp;
                    <button onClick={onImageRemoveAll}>Remove all images</button>
                    {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                            <img src={image['data_url']} alt="" width="100" />
                            <div className="image-item__btn-wrapper">
                                <button onClick={() => onImageUpdate(index)}>Update</button>
                                <button onClick={() => onImageRemove(index)}>Remove</button>
                                <input {...register(`upload_img_id[${index}]`)} type='hidden' />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>


    )
}

export default ImgUploader