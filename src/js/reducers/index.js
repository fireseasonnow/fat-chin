import * as actionTypes from '../actions';

const initialState = {
    albums: [],
    isCoverZoom: false,
    areLyrics: false,
    lyrics: {},
};

const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case actionTypes.LOAD_ALBUMS:
            newState.albums = action.albums;
            break;
        case actionTypes.UPDATE_TRACKS_VISIBILITY:
            // eslint-disable-next-line max-len
            newState.albums[action.albumIndex].tracksVisible = !newState.albums[action.albumIndex].tracksVisible;
            break;
        case actionTypes.UPDATE_COVER_ZOOM:
            // eslint-disable-next-line max-len
            newState.albums[action.albumIndex].coverZoom = !newState.albums[action.albumIndex].coverZoom;
            newState.isCoverZoom = !newState.isCoverZoom;
            break;
        case actionTypes.SHOW_LYRICS:
            newState.lyrics.name = action.name;
            newState.lyrics.text = action.text;
            newState.areLyrics = !newState.areLyrics;
            break;
        case actionTypes.HIDE_LYRICS:
            newState.areLyrics = !newState.areLyrics;
            break;
        default:
            // do nothing
    }

    return newState;
};

export default reducer;
