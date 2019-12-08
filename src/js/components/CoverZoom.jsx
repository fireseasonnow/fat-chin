// @flow
import React from 'react';

type Props = {
    albumIndex: number,
    name: string,
    coverUrl: string,
    coverZoomHandler: (e: Object, index: number) => void
};

const coverZoom = (props: Props) => (
    <div className="cover-zoom__inner">
        <button className="cover-zoom__close qa-cover-zomm__close" onClick={(e) => props.coverZoomHandler(e, props.albumIndex)} type="button"></button>
        <img className="cover-zoom__img" src={props.coverUrl} alt={`'${props.name}' album cover`} />
    </div>
);

export default coverZoom;
