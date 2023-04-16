import _ from 'lodash'
import React from 'react'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
const BoardCard = ({ data }) => {
    console.log('data==================', data)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };
    const Wrapper = styled.div`
    margin-top: 1rem;
    padding: 0.5rem;

    background:gray;
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    max-width : 33rem;
    width : 100%
  
`;

    const ImgWrapDiv = styled.div`
    color: #fff;
`
    const ImgWrap = styled.img`
    width: 100%;
    height: auto;
    margin: 15px;
`
    return (
        <Wrapper>

            <ImgWrapDiv>
                <ImgWrap src={`uploads/${_.get(data, 'uploadfiles.0.filename')}`} alt="" />
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


