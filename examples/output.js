export default {
  query: {
    bool: {
      should: [
        {
          match: {
            bike_type: 'road'
          }
        },
        {
          match: {
            size: 54
          }
        },
        {
          match: {
            release_date: '2016-06-03'
          }
        },
        {
          query: {
            range: {
              ship_date: {
                lte: '2017-01-01',
                gte: '2016',
                format: 'dd/MM/yyyy||yyyy'
              }
            }
          }
        },
        {
          query_string: {
            query: '(black OR gray) AND red',
            default_field: 'colors',
            analyze_wildcard: false,
            fuzziness: 0
          }
        },
        {
          query_string: {
            query: 'carbon OR "aluminum alloy"',
            default_field: 'frame',
            analyze_wildcard: false,
            fuzziness: 0
          }
        },
        {
          query_string: {
            query: 'Gianz~ OR Spec*',
            default_field: 'brand',
            analyze_wildcard: true,
            fuzziness: 'auto'
          }
        },
        {
          multi_match: {
            query: 2,
            fields: ['wheels', 'pedals'],
            type: 'best_fields',
            operator: 'or'
          }
        },
        {
          query_string: {
            query: 'skinny tires',
            default_field: ['specs.*', 'keywords^2'],
            analyze_wildcard: false,
            fuzziness: 0
          }
        }
      ],
      minimum_should_match: 2,
      must_not: [
        {
          query: {
            range: {
              price: {
                gt: 1000,
                lt: 600
              }
            }
          }
        }
      ],
      filter: [
        {
          query_string: {
            query: 'like new',
            default_field: 'condition',
            analyze_wildcard: false,
            fuzziness: 0
          }
        }
      ]
    }
  },
  size: 5,
  sort: {
    price: {
      order: 'asc'
    }
  }
};
