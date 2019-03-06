/**
 * @param obj - an object containing concise match queries.
 * @returns an array of parsed Elasticsearch match queries.
 */
export const parseMatch = (obj: IConciseMatchQuery): IMatchQuery[] =>
  Object.keys(obj).map(
    (k): IMatchQuery => ({
      match: { [k]: obj[k] }
    })
  );

/**
 * @param obj - an object containing concise range queries.
 * @returns an array of parsed Elasticsearch range queries.
 */
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

/**
 * @param obj - an object containing concise enums queries.
 * @returns an array of parsed Elasticsearch query string queries.
 */
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

/**
 * @param obj - an array containing concise multiField queries.
 * @returns an array of parsed Elasticsearch multi match queries.
 */
export const parseMultiField = (
  arr: IConciseMultiFieldQueryArray
): IMultiMatchQuery[] =>
  arr.map(({ fields, value }) => ({
    multi_match: {
      query: value,
      fields
    }
  }));
