interface ConciseMatchQuery {
  [key: string]: string | number | boolean;
}

interface ConciseRangeQuery {
  [key: string]: {
    lte?: number | string;
    gte?: number | string;
    format?: string;
  };
}

interface ConciseEnumsQuery {
  [key: string]: string | string[];
}

declare type ConciseMultiFieldQueryArray = {
  fields: string[];
  value: string | number | boolean;
}[];

interface Queries {
  match?: ConciseMatchQuery;
  enums?: ConciseEnumsQuery;
  range?: ConciseRangeQuery;
  multiField?: ConciseMultiFieldQueryArray;
}

interface ConciseQueries extends Queries {
  filter?: Queries;
  exclude?: Queries;
}

interface MatchQuery {
  match: ConciseMatchQuery;
}

interface RangeQuery {
  query: {
    range: {
      lte?: number | string;
      gte?: number | string;
      format?: string;
    };
  };
}

interface QueryStringQuery {
  query_string: {
    query: string;
    default_field: string;
    analyze_wildcard?: boolean;
    fuzziness?: string | number;
  };
}

interface MultiMatchQuery {
  multi_match: {
    query: string | number | boolean;
    fields: string[];
    type: string;
    operator: string;
  };
}

declare type Query =
  | MatchQuery
  | RangeQuery
  | QueryStringQuery
  | MultiMatchQuery;

interface ConciseConfig {
  url: string;
  size?: number;
  match?: number;
  test?: boolean;
  sortBy?: { field: string; order: string };
}

interface BoolQuery {
  minimum_should_match?: number;
  should?: Query[];
  must?: Query[];
  must_not?: Query[];
  filter?: Query[];
}

interface QueryRequestBody {
  query: { bool: BoolQuery };
  size?: number;
  sort?: object;
}
