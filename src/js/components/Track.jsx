// @flow
import React from 'react';

type Props = {
    number: number,
    name: string,
    showLyricsHandler: (e: Object, name: string) => void
};

const track = (props: Props) => (
    <li className="album__track"><button className="album__track-btn qa-album__track-btn" type="button" onClick={(e) => props.showLyricsHandler(e, props.name)}>{props.number}. {props.name}</button></li>
);

export default track;