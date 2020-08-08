import React from 'react';
import renderer from 'react-test-renderer';
import { FormItem } from '.';
import { Input } from '../Input';
import '../../App.css';

describe('FormItem renders correctly', () => {
  it('renders correctly with input', () => {
    const component = renderer.create(
      <FormItem label="Label">
        <Input value="sunshine" name="input" onChange={() => {}} onBlur={() => {}} />
      </FormItem>
    );

    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});
