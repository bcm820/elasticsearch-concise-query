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
        console.log(`Sending request to ${config.url}!`);
        this.sendQuery();
      }
    }

    sendQuery = () =>
      fetch(config.url, {
        method: 'POST',
        body: JSON.stringify(build(queries, config))
      })
        .then(res => res.json())
        .then(res => this.setState({ results: res.hits.hits }))
        .catch(err => console.error(`ECQ: Request failed. ${err}`));

    render() {
      return <Component {...this.props as Props} data={this.state.results} />;
    }
  };

export const buildECQ = build;
