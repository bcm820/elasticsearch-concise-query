interface IConciseMatchQuery {
  [key: string]: string | number | boolean;
}

interface IConciseRangeQuery {
  [key: string]: {
    readonly lte?: number | string;
    readonly gte?: number | string;
    readonly format?: string;
  };
}

interface IConciseEnumsQuery {
  [key: string]: string | string[];
}

declare type IConciseMultiFieldQueryArray = {
  readonly fields: string[];
  readonly value: string | number | boolean;
}[];

interface IQueries {
  readonly match?: IConciseMatchQuery;
  readonly enums?: IConciseEnumsQuery;
  readonly range?: IConciseRangeQuery;
  readonly multiField?: IConciseMultiFieldQueryArray;
}

interface IConciseQueries extends IQueries {
  readonly filter?: IQueries;
  readonly exclude?: IQueries;
}

interface IMatchQuery {
  readonly match: IConciseMatchQuery;
}

interface IRangeQuery {
  query: {
    range: {
      [key: string]: {
        readonly lte?: number | string;
        readonly gte?: number | string;
        readonly format?: string;
      };
    };
  };
}

interface IQueryStringQuery {
  query_string: {
    readonly query: string;
    readonly default_field: string;
    readonly analyze_wildcard: boolean;
    readonly fuzziness: string | number;
  };
}

interface IMultiMatchQuery {
  multi_match: {
    readonly query: string | number | boolean;
    readonly fields: string[];
  };
}

declare type IQuery =
  | IMatchQuery
  | IRangeQuery
  | IQueryStringQuery
  | IMultiMatchQuery;

interface IConciseConfig {
  readonly index: string;
  readonly size?: number;
  readonly required?: number;
  readonly test?: boolean;
  readonly sortBy?: { field: string; order?: string };
}

interface IBoolQuery {
  must?: IQuery[];
  should?: IQuery[];
  minimum_should_match?: number;
  must_not?: IQuery[];
  filter?: IQuery[];
}

interface IQueryRequestBody {
  readonly query: { bool: IBoolQuery };
  size?: number;
  sort?: object;
}
