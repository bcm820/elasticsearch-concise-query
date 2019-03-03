const build = (
  { match = {}, range = {}, enums = {}, multiField = {} }: ConciseQueries,
  config: ConciseConfig
): QueryRequestBody => {
  const matchQueries = Object.keys(match).map(k => ({
    match: { [k]: match[k] }
  }));

  const rangeQueries = Object.keys(range).map(k => ({
    query: {
      range: {
        [k]: { ...range[k] }
      }
    }
  }));

  const qsQueries = Object.keys(enums).map(k => ({
    query_string: {
      query: typeof enums[k] === 'string' ? enums[k] : enums[k].join(' OR ')
    }
  }));

  return {
    query: { bool: {} }
  };
};
