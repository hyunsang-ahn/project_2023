import _ from 'lodash'
import React from 'react'

const BoardCard = ({ data }) => {
    console.log('data==================', data)
    return (
        <>
            <div>{_.get(data, 'title')}</div>
            <div>{_.get(data, 'description')}</div>
            <div>{_.get(data, 'uploadfiles').map((c, idx) => {
                const alt = _.get(c, 'filename')

                const src = 'uploads/' + alt
                return (
                    <img src={src} alt={alt}></img>
                )

            })}
            </div>

        </>
    )
}

export default BoardCard