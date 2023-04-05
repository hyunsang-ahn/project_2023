import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtil';

const Wrapper = styled.div`

    margin-top : 1rem;

    background: ${oc.teal[6]};
    color: white;

    text-align: center;


    cursor: pointer;
    user-select: none;
    transition: .2s all;
    &:hover {
        background: ${oc.teal[5]};
        ${shadow(0)}
    }
    &:active {
        background: ${oc.teal[7]};
    }

`;

const Button = styled.button`
    width :100%;
    height : 100%;
    border : none;
    background: ${oc.teal[6]};
    color: white;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;
    &:hover {
        background: ${oc.teal[5]};
        ${shadow(0)}
    }

    &:active {
        background: ${oc.teal[7]};
    }

`;

const AuthSubmitButton = ({ children, onClick }) => (
    <Wrapper onClick={onClick}>
        <Button>{children}</Button>
    </Wrapper>
);

export default AuthSubmitButton;