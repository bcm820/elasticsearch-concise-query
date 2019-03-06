export const parseMatch = (obj: IConciseMatchQuery): IMatchQuery[] =>
  Object.keys(obj).map(
    (k): IMatchQuery => ({
      match: { [k]: obj[k] }
    })
  );

export const parseRange = (obj: IConciseRangeQuery): IRangeQuery[] =>
  Object.keys(obj).map(
    (k): IRangeQuery => ({
      query: {
        range: {
          [k]: { ...(obj[k] as object) }
        }
      }
    })
  );

export const parseEnums = (obj: IConciseEnumsQuery): IQueryStringQuery[] =>
  Object.keys(obj).map(
    (k): IQueryStringQuery => {
      const query = (obj[k] as string[]).join
        ? (obj[k] as string[]).join(' OR ')
        : (obj[k] as string);
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
  arr: IConciseMultiFieldQueryArray
): IMultiMatchQuery[] =>
  arr.map(({ fields, value }) => ({
    multi_match: {
      query: value,
      fields
    }
  }));
