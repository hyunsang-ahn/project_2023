import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import _ from 'lodash';
import BoardCard from 'components/BoardCard';
import styled from 'styled-components';

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

    const BoardCardWrap = styled.div`
        display : flex;
        align-items : center;
        justify-content : flex-start;
        flex-wrap : wrap;
`
    return (
        <BoardCardWrap>

            {boardList.map((c, idx) => {
                return (
                    <BoardCard
                        key={idx}
                        data={c}
                    />
                )
            })}
        </BoardCardWrap>
    )
}

export default BoardList