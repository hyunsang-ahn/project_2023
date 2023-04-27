import _ from 'lodash';
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import axios from 'axios';



const PlayerSelector = () => {
    const [text, setText] = useState('')
    const [searchData, setSearchData] = useState([])

    const searchPlayer = async () => {
        console.log('text-------------------', text)
        const { data: { result: search_data } } = await axios.get(`/custom-api/PlayerSearch?text=${text}`)
        console.log('search_data-------------------', search_data)
        setSearchData(search_data)
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

                        searchData.map((c) => {
                            return (
                                <div>
                                    <span>{_.get(c, 'name')}</span>
                                    <span><img src={_.get(c, 'seasons.seasonImg')} alt='seasonImg' /></span>
                                    <span>
                                        <img
                                            src={`/playersAction/p${_.get(c, 'id')}.png`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `/players/p${_.get(c, 'id')}.png`;
                                            }}
                                            alt='player'
                                        />

                                    </span>

                                </div>
                            )
                        })
                    }
                </div>
            )}
        </Popup>
    );
}

export default PlayerSelector