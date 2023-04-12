import _ from 'lodash'
import React from 'react'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
    return (
        <>
            <div>{_.get(data, 'title')}</div>
            <div>{_.get(data, 'description')}</div>
            <div >
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
            </div>


        </>
    )
}

export default BoardCard


