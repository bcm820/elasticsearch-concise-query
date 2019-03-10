import React from 'react';
import { ECQ } from 'elasticsearch-concise-query';
import queries from './queries';
import config from './config';

const Display = ({ title, data }) => (
  <div>
    <h3>{title}</h3>
    <pre style={{ whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
);

export const App = ({ results, query }) => (
  <div
    style={{
      display: 'flex',
      maxWidth: '100vw',
      justifyContent: 'space-evenly'
    }}>
    <div>
      <Display title={'Queries'} data={queries} />
      <Display title={'Config'} data={config} />
    </div>
    <Display title={'Query'} data={query} />
    <Display title={'Output'} data={results} />
  </div>
);

export default ECQ(queries, config)(App);
