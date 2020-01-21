import React from 'react';
import { addDecorator } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { GlobalStyle } from '../src/js/App';

addDecorator(story => (
    <>
      <GlobalStyle />
      {story()}
    </>
),
withA11y);
