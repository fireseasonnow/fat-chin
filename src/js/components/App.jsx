// @flow
import React, { Component } from 'react';
import Album from './Album';
import CoverZoom from './CoverZoom';
import Lyrics from './Lyrics';
import * as actionCreators from '../actions';
import axios from 'axios';

type Props = {
    state: Object,
    dispatch: (Function) => void
};

export default class App extends Component<Props> {
    componentDidMount() {
        const { dispatch } = this.props;

        axios.get('/json/data.json')
            .then(response => dispatch(actionCreators.loadAlbums(response.data)))
            .catch(error => console.log(error));
    }

    tracksVisibilityHandler = (e: SyntheticMouseEvent<HTMLButtonElement>, index: number) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        dispatch(actionCreators.updateTracksVisibility(index));
    };

    coverZoomHandler = (e: SyntheticMouseEvent<HTMLButtonElement>, index: number) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        dispatch(actionCreators.updateCoverZoom(index));
    };

    showLyricsHandler = (e: SyntheticMouseEvent<HTMLButtonElement>, name: string) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        axios.get('http://lyric-api.herokuapp.com/api/find/Pink%20Floyd/' + name)
            .then(response => dispatch(actionCreators.showLyrics(name, response.data.lyric)))
            .catch(error => console.log(error));
    };

    hideLyricsHandler = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
        const { dispatch } = this.props;
        e.stopPropagation();

        dispatch(actionCreators.hideLyrics());
    };

    renderAlbum = (index: number) => {
        const { name, coverUrl, year, tracks, tracksVisible } = this.props.state.albums[index];

        return (
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
    };

    renderCoverZoom = (index: number) => {
        const { name, coverUrl } = this.props.state.albums[index];

        return (
            <CoverZoom
                key={index}
                albumIndex={index}
                name={name}
                coverUrl={coverUrl}
                coverZoomHandler={this.coverZoomHandler}
            />
        );
    };

    renderLyrics = (name: string, text: string) => {
        return (
            <Lyrics
                name={name}
                text={text}
                hideLyricsHandler={this.hideLyricsHandler}
            />
        );
    };

    render() {
        const { isCoverZoom, albums, areLyrics, lyrics } = this.props.state;
        const albumListClass = isCoverZoom || areLyrics ? "album__list album__list--blocked" : "album__list";
        const coverZoomClass = isCoverZoom || areLyrics ? "cover-zoom cover-zoom--active" : "cover-zoom";

        return (
            <>
                <ul className={albumListClass}>
                    {Object.keys(albums).map(index => this.renderAlbum(parseInt(index, 10)))}
                </ul>

                <div className={coverZoomClass}>
                    {isCoverZoom ? Object.keys(albums).map(index => albums[index].coverZoom ? this.renderCoverZoom(parseInt(index, 10)) : null) : null}
                    {areLyrics ? this.renderLyrics(lyrics.name, lyrics.text) : null}
                </div>
            </>
        );
    }
};