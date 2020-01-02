import React from 'react';
import styled from 'styled-components';
import Track from './Track';

const Album = ({
    name,
    coverUrl,
    year,
    tracks,
    tracksVisible,
    index,
    tracksVisibilityHandler,
    coverZoomHandler,
    lyricsVisibilityHandler,
}) => (
    <Item>
        <Title>
            {`${name} (${year})`}
        </Title>
        <CoverWrapper>
            <CoverImg src={coverUrl} alt={`'${name}' album cover`} />
            <Overlay>
                <OverlayItem onClick={() => tracksVisibilityHandler(index)} type='button'>{tracksVisible ? 'Hide tracks' : 'Show tracks'}</OverlayItem>
                <OverlayItem onClick={() => coverZoomHandler(index)} type='button'>Zoom cover</OverlayItem>
            </Overlay>
        </CoverWrapper>

        <Tracks>
            {tracksVisible && tracks.map((track, trackIndex) => (
                <Track
                    key={trackIndex}
                    number={parseInt(trackIndex, 10) + 1}
                    name={track}
                    lyricsVisibilityHandler={lyricsVisibilityHandler}
                />
            ))}
        </Tracks>
    </Item>
);

export default Album;

const Item = styled.li`
    list-style: none;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 1em;
    text-align: center;
`;

const CoverImg = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
    filter: grayscale(1);
    transition: filter ease-in-out 250ms;

    ${Item}:hover & {
        filter: grayscale(0);
        transition: filter ease-in-out 250ms;
    }
`;

const CoverWrapper = styled.div`
    position: relative;
`;

const Tracks = styled.ul`
    padding-left: 0;
`;

const Overlay = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: rgba(255, 255, 255, 0.7);
    opacity: 0;
    transition: opacity ease-in-out 250ms;

    ${CoverWrapper}:hover & {
        opacity: 1;
        transition: opacity ease-in-out 250ms;
    }
`;

const OverlayItem = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #000;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    font-family: 'Oswald', sans-serif;
    font-size: 1em;
    border: 0;

    &:first-child,
    &:first-child:active {
        border-right: 1px solid #999;
    }
`;
