import React from 'react';
import { action } from '@storybook/addon-actions';
import Track from '../src/js/Track';

export default {
    title: 'Track',
    component: Track,
};

export const Text = () => (
    <Track
        lyricsVisibilityHandler={action('lyricsVisibilityHandler-click')}
        name='Track'
        number='1'
    />
);
