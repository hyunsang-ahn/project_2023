import _ from 'lodash';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';



const PlayerSelector = () => {
    const [text, setText] = useState('')
    const [searchData, setSearchData] = useState([])

    const searchPlayer = async () => {
        console.log('text-------------------', text)
        const searchResult = await axios.get(`/custom-api/PlayerSearch?text=${text}`)
        console.log('searchResult-------------------', searchResult)

    }
    return (
        <Popup
            trigger={<button className="button" type='button'> Open Modal </button>}
            modal
            nested
        >
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <div className="header"> 선수검색 </div>
                    <input type='text' onChange={(e) => setText(e.target.value)} />
                    <button type='button' onClick={searchPlayer} >검색하기</button>
                    {!_.isEmpty(searchData) &&

                        <div>데이터가 나와벌임!</div>
                    }
                </div>
            )}
        </Popup>
    );
}

export default PlayerSelector