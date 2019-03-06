import {
  parseMatch,
  parseRange,
  parseEnums,
  parseMultiField
} from '../parsers';

describe('parseMatch', () => {
  test('match query with a string value', () => {
    const input = { a: 'b' };
    const output = [{ match: { a: 'b' } }];
    expect(parseMatch(input)).toEqual(output);
  });

  test('match query with a number value', () => {
    const input = { n: 1 };
    const output = [{ match: { n: 1 } }];
    expect(parseMatch(input)).toEqual(output);
  });

  test('match query with a boolean value', () => {
    const input = { b: true };
    const output = [{ match: { b: true } }];
    expect(parseMatch(input)).toEqual(output);
  });

  test('match query with a date string value', () => {
    const input = { date: '2016-06-03' };
    const output = [{ match: { date: '2016-06-03' } }];
    expect(parseMatch(input)).toEqual(output);
  });

  test('multiple match queries', () => {
    const input = { a: 'b', n: 1, date: '2016-06-03' };
    const output = [
      { match: { a: 'b' } },
      { match: { n: 1 } },
      { match: { date: '2016-06-03' } }
    ];
    expect(parseMatch(input)).toEqual(output);
  });
});

describe('parseRange', () => {
  test('range query with a gte value', () => {
    const input = { amount: { gte: 1 } };
    const output = [{ query: { range: input } }];
    expect(parseRange(input)).toEqual(output);
  });

  test('range query with an lte value', () => {
    const input = { amount: { lte: 5 } };
    const output = [{ query: { range: input } }];
    expect(parseRange(input)).toEqual(output);
  });

  test('range query with gte and lte values', () => {
    const input = { amount: { gte: 1, lte: 5 } };
    const output = [{ query: { range: input } }];
    expect(parseRange(input)).toEqual(output);
  });

  test('range query with date values', () => {
    const input = { date: { gte: '2012-03-05', lte: '2016-04-07' } };
    const output = [{ query: { range: input } }];
    expect(parseRange(input)).toEqual(output);
  });

  test('date range query with multiple formats', () => {
    const input = {
      date: {
        gte: '2011',
        lte: '2016-02-09',
        format: 'dd-MM-yyyy||yyyy'
      }
    };
    const output = [{ query: { range: input } }];
    expect(parseRange(input)).toEqual(output);
  });

  test('multiple range queries', () => {
    const input = { amount1: { gte: 1 }, amount2: { lte: 5 } };
    const output = [
      { query: { range: { amount1: input.amount1 } } },
      { query: { range: { amount2: input.amount2 } } }
    ];
    expect(parseRange(input)).toEqual(output);
  });
});

describe('parseEnums', () => {
  test('query string query using an array', () => {
    const input = { a: ['b', 'c', 'd'] };
    const output = [
      {
        query_string: {
          query: 'b OR c OR d',
          default_field: 'a',
          analyze_wildcard: false,
          fuzziness: 0
        }
      }
    ];
    expect(parseEnums(input)).toEqual(output);
  });

  test('query string query using a string', () => {
    const input = { a: '(b AND c) or d' };
    const output = [
      {
        query_string: {
          query: '(b AND c) or d',
          default_field: 'a',
          analyze_wildcard: false,
          fuzziness: 0
        }
      }
    ];
    expect(parseEnums(input)).toEqual(output);
  });

  test('query string query with a wildcard', () => {
    const input = { a: ['b', 'c*'] };
    const output = [
      {
        query_string: {
          query: 'b OR c*',
          default_field: 'a',
          analyze_wildcard: true,
          fuzziness: 0
        }
      }
    ];
    expect(parseEnums(input)).toEqual(output);
  });

  test('query string query with fuzziness', () => {
    const input = { a: ['b', 'c~'] };
    const output = [
      {
        query_string: {
          query: 'b OR c~',
          default_field: 'a',
          analyze_wildcard: false,
          fuzziness: 'auto'
        }
      }
    ];
    expect(parseEnums(input)).toEqual(output);
  });

  test('multiple query string queries', () => {
    const input = { a: ['b', 'c~'], d: ['e', '*f'] };
    const output = [
      {
        query_string: {
          query: 'b OR c~',
          default_field: 'a',
          analyze_wildcard: false,
          fuzziness: 'auto'
        }
      },
      {
        query_string: {
          query: 'e OR *f',
          default_field: 'd',
          analyze_wildcard: true,
          fuzziness: 0
        }
      }
    ];
    expect(parseEnums(input)).toEqual(output);
  });
});

describe('parseMultiField', () => {
  test('multi match query with a string value', () => {
    const input = [{ fields: ['a', 'b'], value: 'c' }];
    const output = [
      {
        multi_match: {
          query: 'c',
          fields: ['a', 'b']
        }
      }
    ];
    expect(parseMultiField(input)).toEqual(output);
  });

  test('multi match query with a number value', () => {
    const input = [{ fields: ['a', 'b'], value: 1 }];
    const output = [
      {
        multi_match: {
          query: 1,
          fields: ['a', 'b']
        }
      }
    ];
    expect(parseMultiField(input)).toEqual(output);
  });

  test('multi match query with a boolean value', () => {
    const input = [{ fields: ['a', 'b'], value: true }];
    const output = [
      {
        multi_match: {
          query: true,
          fields: ['a', 'b']
        }
      }
    ];
    expect(parseMultiField(input)).toEqual(output);
  });

  test('multiple multi match queries', () => {
    const input = [
      { fields: ['a', 'b'], value: 'c' },
      { fields: ['a', 'b'], value: 1 },
      { fields: ['a', 'b'], value: true }
    ];
    const output = [
      {
        multi_match: {
          query: 'c',
          fields: ['a', 'b']
        }
      },
      {
        multi_match: {
          query: 1,
          fields: ['a', 'b']
        }
      },
      {
        multi_match: {
          query: true,
          fields: ['a', 'b']
        }
      }
    ];
    expect(parseMultiField(input)).toEqual(output);
  });
});
