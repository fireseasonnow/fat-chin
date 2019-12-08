// @flow
import React from 'react';

type Props = {
    name: string,
    text: string,
    hideLyricsHandler: (e: Object) => void
};

const lyrics = (props: Props) => (
    <div className="cover-zoom__inner lyrics__inner">
        <button className="cover-zoom__close lyrics__close-btn qa-lyrics__close-btn" onClick={(e) => props.hideLyricsHandler(e)} type="button"></button>
        <p className="lyrics__text qa-lyrics__text"><span className="lyrics__heading">{props.name}</span> {props.text ? props.text : 'Instrumental'}</p>
    </div>
);

export default lyrics;
