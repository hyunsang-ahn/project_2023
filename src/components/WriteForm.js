import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import { useSelector, useDispatch } from "react-redux";
import { getUser } from "reducers/user";
import _ from 'lodash';
import Draft from 'components/Draft';
import ImageUploading from 'react-images-uploading';


const WriteForm = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        return new Promise(
            (resolve, reject) => {
                const formData = new FormData();
                console.log('file=============================', imageList)
                const new_ima_list = imageList.map((c) => c.file)
                console.log('new_ima_list=============================', new_ima_list)

                formData.append('multipartFiles', new_ima_list);
                axios.post('/custom-api/uploadImage', formData)
                    .then((response) => {
                        resolve({ data: { link: response.data.path } });
                    })
                    .catch((error) => {
                        console.log(error);
                        reject(error);
                    });
            }
        );


    };
    return (

        <div className="App">
            <input type='text' />

            <Draft />
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
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </ImageUploading>
        </div>


    )
}

export default WriteForm