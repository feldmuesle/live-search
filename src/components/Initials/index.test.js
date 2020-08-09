import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import { Initials } from '.';
import '../../App.css';

describe('Initials renders correctly', () => {
  it('renders correctly with given value', () => {
    const component = renderer.create(<Initials firstname="Lisa" lastname="sunshine" />);

    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('Functionality', () => {
  it('creates intitials correctly fro names', () => {
    render(<Initials firstname="Lisa" lastname="sunshine" />);
    const initials = screen.getByText('LS');

    expect(initials).toBeTruthy();
  });
});
