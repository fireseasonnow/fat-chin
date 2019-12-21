// @flow
import React from 'react';
import styled from 'styled-components'

type Props = {
    name: string,
    text: string,
    hideLyricsHandler: (e: Object) => void
};

const lyrics = (props: Props) => (
    <Inner>
        <Close onClick={(e) => props.hideLyricsHandler(e)} type="button"></Close>
        <Text><Heading>{props.name}</Heading> {props.text ? props.text : 'Instrumental'}</Text>
    </Inner>
);

export default lyrics;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    height: 100%;
    overflow-y: scroll;
`;

const Close = styled.button`
    align-self: start;
    top: 42px;
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

const Text = styled.p`
    margin: 50px 0;
    white-space: pre-line;
`;

const Heading = styled.span`
    display: block;
    text-transform: uppercase;
    margin-bottom: 20px;
`;
