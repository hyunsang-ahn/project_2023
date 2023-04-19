import React from 'react'
import { useParams } from "react-router";
const BoardDetail = () => {
    let { id } = useParams();
    console.log('params---------------', id)
    return (
        <div>{id}</div>
    )
}

export default BoardDetail