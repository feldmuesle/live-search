import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { render, fireEvent, screen, within } from '@testing-library/react';
import setupIcons from '../../setup-icons';
import { SearchInput } from '.';
import useStringSearch from '../../hooks/use-string-search';

setupIcons();

const data = [
  { name: 'cat', id: '1' },
  { name: 'catastrophe', id: '2' },
  { name: 'category', id: '3' },
  { name: 'tiger', id: '4' },
];

const getResult = useStringSearch(['name', 'name']);

const formatSelection = ({ name }) => `${name}`;

// eslint-disable-next-line react/prop-types
function ResultComponent({ name }) {
  return <div>{name}</div>;
}

describe('SearchInput renders correctly', () => {
  it('renders correctly when closed', () => {
    const component = renderer.create(
      <SearchInput
        data={data}
        getResult={getResult}
        resultComponent={ResultComponent}
        formatSelection={formatSelection}
      />
    );

    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('renders correctly when user clicks on input', () => {
    const component = renderer.create(
      <SearchInput
        data={data}
        getResult={getResult}
        resultComponent={ResultComponent}
        formatSelection={formatSelection}
      />
    );

    const input = component.root.findByType('input');
    act(() => {
      input.props.onFocus({ target: { setAttribute: () => {} } });
    });

    const snapshot = component.toJSON();
    expect(snapshot).toMatchSnapshot();
  });
});

describe('user interaction', () => {
  describe('when users focusses on empty input', () => {
    it('opens dropdown on focus', () => {
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={formatSelection}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();
      const dropdown = screen.getByRole('list');

      expect(dropdown).toBeTruthy();
    });

    it('it displays all items', () => {
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={formatSelection}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();
      const dropdown = screen.getByRole('list');
      const listitems = within(dropdown).getAllByRole('listitem');

      expect(listitems.length).toEqual(4);
    });

    it('displays correct search results for current value', () => {
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={formatSelection}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();

      const listItem = screen.getByText('cat');
      fireEvent.mouseDown(listItem);

      input.focus();
      const listItems = screen.queryAllByRole('listitem');

      expect(listItems.length).toEqual(3);
    });
  });

  describe('user types into input', () => {
    it('calls function for getting results', () => {
      const onChange = jest.fn(() => data);
      render(
        <SearchInput
          data={data}
          getResult={onChange}
          resultComponent={ResultComponent}
          formatSelection={formatSelection}
        />
      );
      const value = 'cat';
      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value } });

      expect(onChange).toHaveBeenCalled();
    });
  });

  describe('user clicks on item in dropdown', () => {
    it('calls function for formatting selection', () => {
      const format = jest.fn(() => 'something');
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={format}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();

      const selection = screen.getByText('cat');
      fireEvent.mouseDown(selection);

      expect(format).toHaveBeenCalled();
    });

    it('updates value with formatted selection and closes dropdown', () => {
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={formatSelection}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();

      const selection = screen.getByText('cat');
      fireEvent.mouseDown(selection);

      const dropdown = screen.queryByRole('list');

      expect(input.value).toBe('cat');
      expect(dropdown).toBeFalsy();
    });
  });

  describe('input looses focus', () => {
    it('closes dropdown', () => {
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={formatSelection}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();
      input.blur();

      const dropdown = screen.queryByRole('list');

      expect(dropdown).toBeFalsy();
    });

    it('keeps the current value', () => {
      const format = ({ name }) => `${name} ${name}`;
      render(
        <SearchInput
          data={data}
          getResult={getResult}
          resultComponent={ResultComponent}
          formatSelection={format}
        />
      );
      const input = screen.getByRole('textbox');
      input.focus();

      const listItem = screen.getByText('cat');
      fireEvent.mouseDown(listItem);

      input.focus();
      input.blur();

      expect(input.value).toBe('cat cat');
    });
  });
});
