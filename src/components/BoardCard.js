import _ from 'lodash'
import React from 'react'

const BoardCard = ({ data }) => {
    console.log('data==================', data)
    return (
        <>
            <div>{_.get(data, 'title')}</div>
            <div>{_.get(data, 'description')}</div>
            <div>{_.get(data, 'upload_img_id')}</div>

        </>
    )
}

export default BoardCard