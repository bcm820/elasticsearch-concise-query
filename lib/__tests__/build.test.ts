import build from '../build';

describe('build', () => {
  it('receives general queries and generates a bool:must query', () => {
    expect(
      build(
        { match: { a: 'b' }, multiField: [{ fields: ['c', 'd'], value: 'e' }] },
        { url: '' }
      )
    ).toEqual({
      query: {
        bool: {
          must: [
            { match: { a: 'b' } },
            { multi_match: { query: 'e', fields: ['c', 'd'] } }
          ]
        }
      }
    });
  });

  it('receives a config with `match` and specifies `should` query', () => {
    expect(build({ match: { a: 'b' } }, { url: '', match: 5 })).toEqual({
      query: {
        bool: { minimum_should_match: 5, should: [{ match: { a: 'b' } }] }
      }
    });
  });

  it('receives a filter query and generates a bool:filter query', () => {
    expect(build({ filter: { match: { a: 'b' } } }, { url: '' })).toEqual({
      query: { bool: { filter: [{ match: { a: 'b' } }] } }
    });
  });

  it('receives an `exclude` query and generates a bool:must_not query', () => {
    expect(build({ exclude: { match: { a: 'b' } } }, { url: '' })).toEqual({
      query: { bool: { must_not: [{ match: { a: 'b' } }] } }
    });
  });

  it('receives a config with `size` and specifies it in the request body object', () => {
    expect(build({}, { url: '', size: 100 })).toEqual({
      query: { bool: {} },
      size: 100
    });
  });

  it('receives a config with `sortBy` and specifies it in the request body object', () => {
    expect(build({}, { url: '', sortBy: { field: 'a' } })).toEqual({
      query: { bool: {} },
      sort: { a: { order: 'desc' } }
    });
  });
});
