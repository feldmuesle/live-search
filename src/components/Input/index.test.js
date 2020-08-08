import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, screen } from '@testing-library/react';
import { Input } from '.';
import '../../App.css';

describe('Input renders correctly', () => {
  it('renders correctly with given value', () => {
    const component = renderer.create(
      <Input value="sunshine" name="input" onChange={() => {}} onBlur={() => {}} />
    );

    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });

  it('renders disabled input', () => {
    const component = renderer.create(
      <Input
        value="sunshine"
        name="input"
        onChange={() => {}}
        onBlur={() => {}}
        disabled
      />
    );

    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('handles events', () => {
  it('calls onChange correctly', () => {
    const handleChange = jest.fn();
    render(<Input value="" name="input" onChange={handleChange} onBlur={() => {}} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'sunshine' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('calls onBlur correctly', () => {
    const handleBlur = jest.fn();
    render(<Input value="" name="input" onChange={() => {}} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalled();
  });
});
