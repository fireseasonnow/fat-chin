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
            text: 'Lorem Ipsum',
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('when lyrics are missing should render lyrics with name and "Instrumental" text', () => {
        wrapper.setProps({
            name: 'Hello',
            text: '',
        });

        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });

    test('when lyrics are missing should render lyrics with name and "Instrumental" text', () => {
        wrapper.setProps({
            name: 'Hello',
            text: '',
        });

        const check = wrapper.find('.qa-lyrics__text').contains('Instrumental');

        expect(check).toBeTruthy();
    });

    test('should fire hideLyricsHandler when clicked on a button', () => {
        const hideLyricsHandler = jest.fn();

        wrapper.setProps({
            hideLyricsHandler,
        });

        const event = { target: { value: 'test' } };
        wrapper.find('.qa-lyrics__close-btn').simulate('click', event.target.value);

        expect(hideLyricsHandler).toHaveBeenCalledWith(event.target.value);
    });
});
