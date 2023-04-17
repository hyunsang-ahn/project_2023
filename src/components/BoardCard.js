import _ from 'lodash'
import React from 'react'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
const BoardCard = ({ data }) => {
    console.log('data==================', data)

    const Wrapper = styled.div`
    margin-top: 10px;
    padding: 10px;

    background:#999999;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    max-width : 30%;
    width : 100%
  
`;

    const ImgWrapDiv = styled.div`
    color: #fff;
    display : flex;
    align-items : center;
    justify-content : center;
    max-width : 100%;
    max-height : 200px;
`
    const ImgWrap = styled.img`
    width : auto;
    height : 100%;
    max-height : 200px;
    
`
    return (
        <Wrapper>

            <ImgWrapDiv>

                {!_.isEmpty(_.get(data, 'uploadfiles.0.filename')) ?
                    <ImgWrap src={`uploads/${_.get(data, 'uploadfiles.0.filename')}`} alt="" />
                    : <ImgWrap src={`https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png`} alt="" />

                }
            </ImgWrapDiv>
            <div>{_.get(data, 'title')}</div>
            <div>{_.get(data, 'description')}</div>
            {/* <div >
                <h2> Single Item</h2>
                <Slider {...settings}>

                    {_.get(data, 'uploadfiles').map((c, idx) => {
                        const alt = _.get(c, 'filename')

                        const src = 'uploads/' + alt
                        return (
                            <div>
                                <img src={src} alt={alt} width={100} height={100}></img>
                            </div>
                        )

                    })}

                </Slider>
            </div> */}


        </Wrapper>
    )
}

export default BoardCard


