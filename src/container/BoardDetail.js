import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const BoardDetail = () => {
    let { id } = useParams();
    const [board, setBoard] = useState()
    console.log('params---------------', id)



    const Wrap = styled.div`
        max-width : 1200px;
        margin: auto;
        padding : 20px;
        background-color : gray;
        height : 100%;
        max-height : 1080px;

`

    const SliderWrap = styled.div`
        padding : 20px;


`

    const ProdImage = styled.img`
width: 100%;
height: 100%;
max-height : 300px;
  object-fit: scale-down	;
`
    const IntroduceContent = styled.div`
      position: relative;
      border: 0.0625rem solid #d7e2eb;
      border-radius: 0.75rem;
      overflow: hidden;
      padding: 1.5rem;
      width: 50%;
      margin: 0 auto;
      margin-bottom: 4rem;
    `;


    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`/custom-api/getBoard?id=${id}`)

            console.log('response===================', response)
            const status = _.get(response, 'status')
            if (status === 200) {
                const data = _.get(response, 'data.result.0')
                console.log('data===================', data)
                setBoard(data)
            }
        }
        fetchData()
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    if (_.isEmpty(board)) {
        return (
            <>잘못된 접근 입니다</>
        )
    } else {
        return (

            <Wrap>
                <SliderWrap>
                    <Slider {...settings}>
                        {_.get(board, 'uploadfiles').map((c, i) => {
                            console.log('c========================', c)
                            return (
                                <div>
                                    <ProdImage src={`/uploads/${_.get(c, 'filename')}`} alt={`_.get(c, 'filename')`} />
                                </div>
                            )
                        })}

                    </Slider>
                </SliderWrap>

                <div>{_.get(board, 'title')}</div>
                <IntroduceContent dangerouslySetInnerHTML={{ __html: _.get(board, 'description') }} />

                <div>{_.get(board, 'updatedAt')}</div>
                <div>{_.get(board, 'user_name')}</div>

            </Wrap>
        )
    }

}

export default BoardDetail