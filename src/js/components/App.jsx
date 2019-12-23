import React, { Component } from 'react';
import Album from './Album';
import CoverZoom from './CoverZoom';
import Lyrics from './Lyrics';
import * as actionCreators from '../actions';
import axios from 'axios';
import styled, { css, createGlobalStyle } from 'styled-components';

export default class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;

        axios.get('/json/data.json')
            .then(response => dispatch(actionCreators.loadAlbums(response.data)))
            .catch(error => console.log(error));
    }

    tracksVisibilityHandler = (e, index) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        dispatch(actionCreators.updateTracksVisibility(index));
    }

    coverZoomHandler = (e, index) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        dispatch(actionCreators.updateCoverZoom(index));
    }

    showLyricsHandler = (e, name) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        axios.get('http://lyric-api.herokuapp.com/api/find/Pink%20Floyd/' + name)
            .then(response => dispatch(actionCreators.showLyrics(name, response.data.lyric)))
            .catch(error => console.log(error));
    }

    hideLyricsHandler = e => {
        const { dispatch } = this.props;
        e.stopPropagation();

        dispatch(actionCreators.hideLyrics());
    }

    renderAlbums = () => {
        const albumsArray = this.props.state.albums;
        const albumsToRender = [];

        albumsArray.forEach((album, index) => {
            const { name, coverUrl, year, tracks, tracksVisible } = album;

            albumsToRender.push(
                <Album
                    key={index}
                    index={index}
                    name={name}
                    coverUrl={coverUrl}
                    year={year}
                    tracks={tracks}
                    tracksVisible={tracksVisible}
                    tracksVisibilityHandler={this.tracksVisibilityHandler}
                    coverZoomHandler={this.coverZoomHandler}
                    showLyricsHandler={this.showLyricsHandler}
                />
            );
        });

        return albumsToRender;
    }

    renderCoverZoom = () => {
        const albums = this.props.state.albums;
        const albumIndex = albums.findIndex(album => album.coverZoom)
        const { name, coverUrl } = this.props.state.albums[albumIndex];

        return (
            <CoverZoom
                key={albumIndex}
                albumIndex={albumIndex}
                name={name}
                coverUrl={coverUrl}
                coverZoomHandler={this.coverZoomHandler}
            />
        );
    }

    renderLyrics = (name, text) => (
        <Lyrics
            name={name}
            text={text}
            hideLyricsHandler={this.hideLyricsHandler}
        />
    )

    render() {
        const { isCoverZoom, albums, areLyrics, lyrics } = this.props.state;

        return (
            <>
                <GlobalStyle />
                <AlbumList
                    isCoverZoom={isCoverZoom}
                    areLyrics={areLyrics}
                >
                    {this.renderAlbums()}
                </AlbumList>

                <CoverZoomWrapper
                    isCoverZoom={isCoverZoom}
                    areLyrics={areLyrics}
                >
                    {isCoverZoom && this.renderCoverZoom()}
                    {areLyrics && this.renderLyrics(lyrics.name, lyrics.text)}
                </CoverZoomWrapper>
            </>
        );
    }
}

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
`

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
