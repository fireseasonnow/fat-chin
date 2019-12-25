import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json';

import Track from './Track';

configure({ adapter: new Adapter() });

describe('<Track />', () => {
    let wrapper = {};

    beforeEach(() => {
        wrapper = shallow(<Track />);
    });

    test('should render without crashing', () => {
        expect(wrapper).toBeTruthy();
    });

    test('should render a track with name and number', () => {
        wrapper.setProps({
            number: 1,
            name: 'Hello',
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('should fire showLyricsHandler when clicked on a button', () => {
        const showLyricsHandler = jest.fn();

        wrapper.setProps({
            name: 'Hello',
            showLyricsHandler,
        });

        wrapper.find('Track__Button').simulate('click');

        expect(showLyricsHandler).toHaveBeenCalledWith('Hello');
    });
});
