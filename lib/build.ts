import { parseMatch, parseRange, parseEnums, parseMultiField } from './parsers';

/**
 * @param conciseQueries - an object containing a variety of concise queries.
 * @returns an array of parsed queries to combine into an Elasticsearch Bool Query.
 */
const buildQueries = ({
  match = {},
  range = {},
  enums = {},
  multiField = []
}: IConciseQueries): IQuery[] => [
  ...parseMatch(match),
  ...parseRange(range),
  ...parseEnums(enums),
  ...parseMultiField(multiField)
];

/**
 * @param conciseQueries - an object containing a variety of concise queries.
 * @param config - a configuration object used for shaping the Elasticsearch query.
 * @returns an Elasticsearch query object to convert to JSON as a request body.
 */
const build = (
  conciseQueries: IConciseQueries,
  config: IConciseConfig
): IQueryRequestBody => {
  const boolQuery: IBoolQuery = {};

  const queriesArray = [...buildQueries(conciseQueries)];
  if (queriesArray.length) {
    if (config.match) {
      boolQuery.should = queriesArray;
      boolQuery.minimum_should_match = config.match;
    } else boolQuery.must = queriesArray;
  }

  if (conciseQueries.filter)
    boolQuery.filter = buildQueries(conciseQueries.filter);
  if (conciseQueries.exclude)
    boolQuery.must_not = buildQueries(conciseQueries.exclude);

  const requestBody: IQueryRequestBody = {
    query: { bool: boolQuery }
  };

  if (config.size) requestBody.size = config.size;
  if (config.sortBy)
    requestBody.sort = {
      [config.sortBy.field]: {
        order: config.sortBy.order || 'desc'
      }
    };

  return requestBody;
};

export = build;
