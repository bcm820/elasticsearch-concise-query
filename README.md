# Elasticsearch Concise Query

**Elasticsearch Concise Query** simplifies the process for querying an Elasticsearch index.

```javascript
import { buildECQ } from 'elasticsearch-concise-query';
```

It is also available as a React higher-order component:

```javascript
import { ECQ } from 'elasticsearch-concise-query';
...
const MyComponent = ({query, results}) => { ... }
export default ECQ(conciseQueries, config)(MyComponent)
```

## Contents <!-- omit in toc -->

- [Basic Example](#basic-example)
- [Configuration](#configuration)
- [Interoperability](#interoperability)
  - [With elasticsearch.js](#with-elasticsearchjs)
  - [With ReactiveSearch](#with-reactivesearch)

<br/>

## Basic Example

[bool]: https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html

[See the `examples` directory for more detailed example usage.](examples)

Using esConnect to access indexed Elasticsearch data for use in an application is as easy as passing a simple, single-depth object with search parameters and an optional configuration object into a function:

```javascript
buildECQ(
  {
    match: { bike_type: 'road' },
    range: { price: { lte: 600, gte: 1000 } },
    enums: { frame: ['carbon', 'aluminum alloy'] },
    multiField: [{ fields: ['description, keywords'], value: 'skinny tires' }]
  },
  {
    index: 'http://path.to/index',
    size: 10,
    required: 4,
    sortBy: { field: 'price', order: 'asc' },
    test: false
  }
);
```

`buildECQ` returns an Elasticsearch [bool query object][bool]:

```json
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "bike_type": "road"
          }
        },
        {
          "query": {
            "range": {
              "price": {
                "lte": 600,
                "gte": 1000
              }
            }
          }
        },
        {
          "query_string": {
            "query": "carbon OR aluminum alloy",
            "default_field": "frame",
            "analyze_wildcard": false,
            "fuzziness": 0
          }
        },
        {
          "multi_match": {
            "query": "skinny tires",
            "fields": ["description, keywords"]
          }
        }
      ],
      "minimum_should_match": 4
    }
  },
  "size": 5,
  "sort": {
    "price": {
      "order": "asc"
    }
  }
}
```

<br/>

## Configuration

A configuration object is passed as a second argument to `buildECQ`:

| KEY          | VALUE TYPE | DESCRIPTION                                                                   |
| ------------ | ---------- | ----------------------------------------------------------------------------- |
| `index`      | String     | The endpoint to send the query object to.                                     |
| `[test]`     | Boolean    | Runs esConnect in "test mode" (does not send a network request).              |
| `[size]`     | Integer    | Specify the maximum amount of results to return. Default: `10`                |
| `[required]` | Integer    | Specify the minimum amount of queries a result should match (all if omitted). |
| `[sortBy]`   | String     | Sort results by a specific date.                                              |

<br/>

## Interoperability

### With elasticsearch.js

To use with ElasticSearch's official Javascript client, [elasticsearch.js](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search), simply call `buildESQuery` as follows in the object given to its `search` method:

```javascript
client.search({
  index: 'myindex',
  body: buildECQ(query, config)
});
```

### With ReactiveSearch

To use with [ReactiveSearch](https://opensource.appbase.io/reactive-manual/advanced/customquery.html), a React component library, simply pass a function that calls `buildESQuery` as follows into the `customQuery` prop. For example:

```javascript
<DataSearch
  ...
  customQuery={() => buildECQ(query, config)}
/>
```
