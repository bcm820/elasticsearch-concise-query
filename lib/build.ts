import { parseMatch, parseRange, parseEnums, parseMultiField } from './parsers';

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

const build = (
  conciseQueries: IConciseQueries,
  config: IConciseConfig
): IQueryRequestBody => {
  const boolQuery: IBoolQuery = {
    [config.match ? 'should' : 'must']: [...buildQueries(conciseQueries)]
  };

  if (conciseQueries.filter)
    boolQuery.filter = buildQueries(conciseQueries.filter);
  if (conciseQueries.exclude)
    boolQuery.must_not = buildQueries(conciseQueries.exclude);
  if (config.match) boolQuery.minimum_should_match = config.match;

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
