// @flow
import React from 'react';
import Track from './Track';

type Props = {
    index: number,
    name: string,
    coverUrl: string,
    year: number,
    tracks: Array<string>,
    tracksVisible: boolean,
    tracksVisibilityHandler: (e: Object, index: number) => void,
    coverZoomHandler: (e: Object, index: number) => void,
    showLyricsHandler: (e: Object, name: string) => void
};

const album = (props: Props) => {
    const { name, coverUrl, year, tracks, tracksVisible, index, tracksVisibilityHandler, coverZoomHandler, showLyricsHandler } = props;
    const tracksVisiblityText = tracksVisible ? 'Hide tracks' : 'Show tracks';

    return (
        <li className="album__item">
            <h1 className="album__name">{name} ({year})</h1>
            <div className="album__cover-wrapper">
                <img className="album__img" src={coverUrl} alt={`'${name}' album cover`} />
                <div className="album__overlay">
                    <button className="album__overlay-item qa-album__overlay-item--tracks-btn" onClick={(e) => tracksVisibilityHandler(e, index)} type="button">{tracksVisiblityText}</button>
                    <button className="album__overlay-item qa-album__overlay-item--zoom-btn" onClick={(e) => coverZoomHandler(e, index)} type="button">Zoom cover</button>
                </div>
            </div>

            <ul className="album__tracks">
                {tracksVisible ? tracks.map((track, index) => (
                    <Track
                        key={parseInt(index, 10)}
                        number={parseInt(index) + 1}
                        name={track}
                        showLyricsHandler={showLyricsHandler}>
                    </Track>
                )) : null}
            </ul>
        </li>
    );
};

export default album;