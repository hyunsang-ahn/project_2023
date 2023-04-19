import _ from 'lodash'
import React from 'react'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const BoardCard = ({ data }) => {
    console.log('data==================', data)
    const navigate = useNavigate();

    const Wrapper = styled.div`
    margin-top: 10px;

    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;
    max-width : 350px;
    width : 100%;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: 0.25rem;
  
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

    const DetailWrap = styled.div`
    width : auto;
    height : 100%;
    max-height : 200px;
    border-top: 1px solid rgba(0,0,0,.125);
    padding: 10px;
    background: #f1f1f5;

    
`
    const TitleWrap = styled.div`
color : black;
font-size : 1.25rem;
font-weight : 500

`

    const Detail = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    gap : 10px;

color : black;
font-size : 0.85rem;
font-weight : 400

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
    return (
        <Wrapper onClick={() => navigate(`/BoardDetail/${_.get(data, '_id')}`)}>
            <ImgWrapDiv>

                {!_.isEmpty(_.get(data, 'uploadfiles.0.filename')) ?
                    <ImgWrap src={`uploads/${_.get(data, 'uploadfiles.0.filename')}`} alt="" />
                    : <ImgWrap src={`https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png`} alt="" />

                }
            </ImgWrapDiv>
            <DetailWrap>
                <TitleWrap>{_.get(data, 'title')}</TitleWrap>
                <Detail>
                    <div>{_.get(data, 'user_name')}</div> |
                    <div>{_.get(data, 'createdAt')}</div>
                </Detail>
            </DetailWrap>
            {/*
            <IntroduceContent dangerouslySetInnerHTML={{ __html: _.get(data, 'description') }} />

            */}

        </Wrapper>
    )
}

export default BoardCard


