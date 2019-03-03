declare type ConciseQueries = {
  match?: object;
  range?: object;
  enums?: object;
  multiField?: object;
};

declare type ConciseConfig = {
  url: string;
  size?: number;
  match?: number;
  sortBy?: string;
  log?: string;
  test: boolean;
};

declare type MatchQuery = {
  match: object;
};

declare type RangeQuery = {
  query: {
    range: object;
  };
};

declare type QueryStringQuery = {
  query_string: {
    query: string | string[];
    default_field: string;
    analyze_wildcard?: boolean;
    fuzziness: number;
  };
};

declare type MultiMatchQuery = {
  multi_match: {
    query: string | number | boolean;
    fields: string[];
    type: string;
    operator: string;
  };
};

declare type Query =
  | MatchQuery
  | RangeQuery
  | QueryStringQuery
  | MultiMatchQuery;

declare type BoolQuery = {
  should?: Query[];
  must?: Query[];
  must_not?: Query[];
  filter?: Query[];
};

declare type QueryRequestBody = {
  query: { bool: BoolQuery };
  size?: number;
  sort?: object;
};
