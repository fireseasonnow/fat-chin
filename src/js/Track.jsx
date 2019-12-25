import React from 'react';
import styled from 'styled-components';

const Track = props => (
    <Item>
        <Button onClick={() => props.showLyricsHandler(props.name)} type='button'>
            {props.number}. {props.name}
        </Button>
    </Item>
);

export default Track;

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
