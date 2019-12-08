import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import Album from './Album';

configure({ adapter: new Adapter() });

describe('<Album />', () => {
    let wrapper = {};

    beforeEach(() => {
        wrapper = shallow(<Album />);
    });

    test('should render without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    test('should render an album without tracks and \'Show tracks\' text', () => {
        wrapper.setProps({
            name: 'Hello',
            coverUrl: 'url',
            year: 1984,
            tracksVisible: false,
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('should render an album with tracks and \'Hide tracks\' text', () => {
        wrapper.setProps({
            name: 'Hello',
            coverUrl: 'url',
            year: 1984,
            tracksVisible: true,
            tracks: [
                'blah',
                'blah-blah'
            ],
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('should fire tracksVisibilityHandler when clicked on a tracks button', () => {
        const tracksVisibilityHandler = jest.fn();

        wrapper.setProps({
            index: 4,
            tracksVisibilityHandler,
        });

        const event = { target: { value: 'test' } };
        wrapper.find('.qa-album__overlay-item--tracks-btn').simulate('click', event.target.value, 4);

        expect(tracksVisibilityHandler).toHaveBeenCalledWith(event.target.value, 4);
    });

    test('should fire coverZoomHandler when clicked on a zoom button', () => {
        const coverZoomHandler = jest.fn();

        wrapper.setProps({
            index: 3,
            coverZoomHandler,
        });

        const event = { target: { value: 'test' } };
        wrapper.find('.qa-album__overlay-item--zoom-btn').simulate('click', event.target.value, 3);

        expect(coverZoomHandler).toHaveBeenCalledWith(event.target.value, 3);
    });
});
