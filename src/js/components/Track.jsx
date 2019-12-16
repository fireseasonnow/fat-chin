// @flow
import React from 'react';
import styled from 'styled-components'

type Props = {
    number: number,
    name: string,
    showLyricsHandler: (e: Object, name: string) => void
};

const track = (props: Props) => (
    <Item>
        <Button type="button" onClick={(e) => props.showLyricsHandler(e, props.name)}>
            {props.number}. {props.name}
        </Button>
    </Item>
);

export default track;

const Item = styled.li`
    position: relative;
    cursor: pointer;
    list-style: none;

    &:hover::after {
        content: 'lyrics';
        font-size: 10px;
        position: absolute;
        right: 0;
        bottom: 0;
    }
`;

const Button = styled.button`
    background: none;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    border: 0;
    padding: 0;
    cursor: inherit;
    outline: none;
    text-align: left;
`;
