/*
 * action types
 */
export const LOAD_ALBUMS = 'LOAD_ALBUMS';
export const UPDATE_TRACKS_VISIBILITY = 'UPDATE_TRACKS_VISIBILITY';
export const UPDATE_COVER_ZOOM = 'UPDATE_COVER_ZOOM';
export const SHOW_LYRICS = 'SHOW_LYRICS';
export const HIDE_LYRICS = 'HIDE_LYRICS';

/*
 * action creators
 */

/**
 * Load albums
 * @param {Array} albums
 */
export const loadAlbums = albums => ({
    type: LOAD_ALBUMS,
    albums,
});

/**
 * Updates tracks visibility
 * @param {Number} albumIndex
 */
export const updateTracksVisibility = albumIndex => ({
    type: UPDATE_TRACKS_VISIBILITY,
    albumIndex,
});

/**
 * Updates cover zoom
 * @param {Number} albumIndex
 */
export const updateCoverZoom = albumIndex => ({
    type: UPDATE_COVER_ZOOM,
    albumIndex,
});

/**
 * Show lyrics
 * @param {String} name
 * @param {String} text
 */
export const showLyrics = (name, text) => ({
    type: SHOW_LYRICS,
    name,
    text,
});

/**
 * Hide lyrics
 */
export const hideLyrics = () => ({
    type: HIDE_LYRICS,
});
