import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled, { css, createGlobalStyle } from 'styled-components';
import Album from './Album';
import CoverZoom from './CoverZoom';
import Lyrics from './Lyrics';

const App = () => {
    const [albums, setAlbums] = useState([]);
    const [isCoverZoom, setIsCoverZoom] = useState(false);
    const [areLyrics, setAreLyrics] = useState(false);
    const [lyrics, setLyrics] = useState({
        name: '',
        text: ''
    });

    useEffect(() => {
        axios.get('/json/data.json')
            .then(response => setAlbums(response.data))
            .catch(error => console.log(error));
    }, []);

    const tracksVisibilityHandler = index => {
        const newAlbums = [...albums];
        newAlbums[index].tracksVisible = !newAlbums[index].tracksVisible;

        setAlbums(newAlbums);
    };

    const showCoverZoomHandler = index => {
        const newAlbums = [...albums];
        newAlbums.forEach((album, albumIndex) => {
            album.coverZoom = albumIndex === index;
        });

        setAlbums(newAlbums);
        setIsCoverZoom(true);
    };

    const closeCoverZoomHandler = () => setIsCoverZoom(false);

    const showLyricsHandler = name => {
        axios.get(`http://lyric-api.herokuapp.com/api/find/Pink%20Floyd/${name}`)
            .then(response => {
                setLyrics({
                    name: name,
                    text: response.data.lyric
                });

                setAreLyrics(true);
            })
            .catch(error => console.log(error));
    };

    const hideLyricsHandler = () => setAreLyrics(false);

    const renderAlbums = () => {
        const albumsToRender = albums.map((album, index) => {
            const { name, coverUrl, year, tracks, tracksVisible } = album;

            return (
                <Album
                    key={index}
                    index={index}
                    name={name}
                    coverUrl={coverUrl}
                    year={year}
                    tracks={tracks}
                    tracksVisible={tracksVisible}
                    tracksVisibilityHandler={tracksVisibilityHandler}
                    showCoverZoomHandler={showCoverZoomHandler}
                    showLyricsHandler={showLyricsHandler}
                />
            );
        });

        return albumsToRender;
    };

    const renderCoverZoom = () => {
        const albumIndex = albums.findIndex(album => album.coverZoom);
        const { name, coverUrl } = albums[albumIndex];

        return (
            <CoverZoom
                name={name}
                coverUrl={coverUrl}
                closeCoverZoomHandler={closeCoverZoomHandler}
            />
        );
    };

    const renderLyrics = (name, text) => (
        <Lyrics
            name={name}
            text={text}
            hideLyricsHandler={hideLyricsHandler}
        />
    );

    return (
        <>
            <GlobalStyle />
            <AlbumList
                isCoverZoom={isCoverZoom}
                areLyrics={areLyrics}
            >
                {renderAlbums()}
            </AlbumList>

            <CoverZoomWrapper
                isCoverZoom={isCoverZoom}
                areLyrics={areLyrics}
            >
                {isCoverZoom && renderCoverZoom()}
                {areLyrics && renderLyrics(lyrics.name, lyrics.text)}
            </CoverZoomWrapper>
        </>
    );
};

export default App;

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html,
    body {
        font-family: 'Oswald', sans-serif;
        margin: 0;
        background: #000;
        color: #fff;
    }
`;

const AlbumList = styled.ul`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 20px;
    max-width: 1224px;
    margin: 0 auto;
    padding-left: 0;

    ${props => (props.isCoverZoom || props.areLyrics) && css`
        max-height: 100vh;
        overflow: hidden;
    `}
`;

const CoverZoomWrapper = styled.div`
    ${props => (props.isCoverZoom || props.areLyrics) && css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
    `}
`;
