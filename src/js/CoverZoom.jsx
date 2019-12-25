import React from 'react';
import styled from 'styled-components';

const coverZoom = props => (
    <Inner>
        <Close onClick={() => props.closeCoverZoomHandler()} type='button' />
        <Img src={props.coverUrl} alt={`'${props.name}' album cover`} />
    </Inner>
);

export default coverZoom;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    height: 100%;
`;

const Close = styled.button`
    align-self: center;
    justify-self: end;
    background: none;
    color: #fff;
    border: 0;
    position: relative;
    left: -15px;
    width: 40px;
    height: 40px;
    outline: 0;
    padding-right: 28px;

    &:hover {
        cursor: pointer;
    }

    &:before {
        content: '';
        position: absolute;
        top: 20px;
        width: 21px;
        height: 1px;
        background-color: currentColor;
        transform: rotate(-45deg);
    }

    &:after {
        content: '';
        position: absolute;
        top: 20px;
        width: 21px;
        height: 1px;
        background-color: currentColor;
        transform: rotate(45deg);
    }
`;

const Img = styled.img`
    align-self: center;
`;
