export const parseMatch = (obj: ConciseMatchQuery): MatchQuery[] =>
  Object.keys(obj).map(
    (k): MatchQuery => ({
      match: { [k]: obj[k] }
    })
  );

export const parseRange = (obj: ConciseRangeQuery): RangeQuery[] =>
  Object.keys(obj).map(
    (k): RangeQuery => ({
      query: {
        range: {
          [k]: { ...(obj[k] as object) }
        }
      }
    })
  );

export const parseEnums = (obj: ConciseEnumsQuery): QueryStringQuery[] =>
  Object.keys(obj).map(
    (k): QueryStringQuery => {
      const query = (<string[]>obj[k]).join
        ? (<string[]>obj[k]).join(' OR ')
        : <string>obj[k];
      return {
        query_string: {
          query,
          default_field: k,
          analyze_wildcard: query.includes('*'),
          fuzziness: query.includes('~') ? 'auto' : 0
        }
      };
    }
  );

export const parseMultiField = (
  arr: ConciseMultiFieldQueryArray
): MultiMatchQuery[] =>
  arr.map(({ fields, value }) => ({
    multi_match: {
      query: value,
      fields,
      type: 'best_fields',
      operator: 'or'
    }
  }));
