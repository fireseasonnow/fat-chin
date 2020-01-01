import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import Lyrics from './Lyrics';

configure({ adapter: new Adapter() });

describe('<Lyrics />', () => {
    let wrapper = {};

    beforeEach(() => {
        wrapper = shallow(<Lyrics />);
    });

    test('should render without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    test('should render lyrics with name and text', () => {
        wrapper.setProps({
            name: 'Hello',
            text: 'Lorem Ipsum'
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('when lyrics are missing should render lyrics with name and "Instrumental" text', () => {
        wrapper.setProps({
            name: 'Hello',
            text: ''
        });

        const check = wrapper.find('Lyrics__Text').contains('Instrumental');

        expect(check).toBeTruthy();
    });

    test('should fire lyricsVisibilityHandler when clicked on a button', () => {
        const lyricsVisibilityHandler = jest.fn();

        wrapper.setProps({
            lyricsVisibilityHandler
        });

        wrapper.find('Lyrics__Close').simulate('click');

        expect(lyricsVisibilityHandler).toHaveBeenCalled();
    });
});
