import { renderHook } from '@testing-library/react-hooks';
import useStringSearch from './use-string-search';

const data = [
  {
    first: 'Lisa',
    last: 'Sunshine',
    favourite: 'green',
  },
  {
    first: 'Peter',
    last: 'Pan',
    favourite: 'red',
  },
  {
    first: 'Moby',
    last: 'Dick',
    favourite: 'blue',
  },
  {
    first: 'Sarah',
    last: 'Toby',
    favourite: 'pink',
  },
];

describe('useStringSearch', () => {
  describe('can filter by given keys - e.g. firstname & lastname', () => {
    it('can handle single key', () => {
      const { result } = renderHook(() => {
        return useStringSearch(['first']);
      });

      const searchResult = result.current(data, 'sa');

      expect(searchResult.length).toBe(2);
      searchResult.map((item) => {
        expect(['Lisa', 'Sarah'].includes(item.first)).toBe(true);
      });
    });

    it('can handle multiple keys', () => {
      const { result } = renderHook(() => {
        return useStringSearch(['first', 'last', 'favourite']);
      });

      const searchResult = result.current(data, 'i');

      expect(searchResult.length).toBe(3);

      searchResult.map((item) => {
        expect(['Lisa', 'Moby', 'Sarah'].includes(item.first)).toBe(true);
      });
    });
  });

  it('can search accross keys ', () => {
    const { result } = renderHook(() => {
      return useStringSearch(['first', 'last']);
    });

    const searchResult = result.current(data, 'rPa');

    searchResult.map((item) => {
      expect(['Pan'].includes(item.last)).toBe(true);
    });
  });

  it('is case-insensitive', () => {
    const { result } = renderHook(() => {
      return useStringSearch(['first', 'last']);
    });

    const searchResult = result.current(data, 'Rpa');

    searchResult.map((item) => {
      expect(['Pan'].includes(item.last)).toBe(true);
    });
  });
});
