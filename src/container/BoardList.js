import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import _ from 'lodash';
import BoardCard from 'components/BoardCard';

const BoardList = () => {
    const [boardList, setBoardList] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('/custom-api/Board')

            console.log('response===================', response)
            const status = _.get(response, 'status')
            if (status === 200) {
                const data = _.get(response, 'data.result')
                console.log('data===================', data)
                setBoardList(data)
            }
        }
        fetchData()
    }, [])


    return (
        <div>

            {boardList.map((c, idx) => {
                return (
                    <BoardCard
                        key={idx}
                        data={c}
                    />
                )
            })}
        </div>
    )
}

export default BoardList