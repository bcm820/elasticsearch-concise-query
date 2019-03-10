import React from 'react';
import build from './build';

export const ECQ = (queries: IConciseQueries, config: IConciseConfig) => <
  Props extends object
>(
  Component: React.ComponentType<Props>
) =>
  class extends React.Component {
    state = { results: [] };

    componentDidMount() {
      if (!config.test) {
        if (!config.index)
          console.error('ECQ: No `index` value set in configuration object.');
        else {
          const index = config.index.endsWith('/')
            ? config.index
            : `${config.index}/`;
          this.sendQuery(index);
        }
      }
    }

    sendQuery = (index: string) =>
      fetch(`${index}_search`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(build(queries, config))
      })
        .then(res => res.json())
        .then(res => this.setState({ results: res.hits.hits }))
        .catch(err => console.error(`ECQ: Request failed. ${err}`));

    render() {
      return (
        <Component {...this.props as Props} results={this.state.results} />
      );
    }
  };

export const buildECQ = build;
