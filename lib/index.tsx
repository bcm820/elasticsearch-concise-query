import React from 'react';
import queries from '../examples/queries';
import config from '../examples/config';
import build from './build';

type DisplayProps = { title: string; data: object };
const Display: React.SFC<DisplayProps> = ({ title, data }) => (
  <div>
    <h3>{title}</h3>
    <pre style={{ fontSize: 20 }}>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

const App: React.SFC<{}> = () => (
  <div
    style={{ display: 'flex', width: '100vw', justifyContent: 'space-evenly' }}>
    <div>
      <Display title={'Queries'} data={queries} />
      <Display title={'Config'} data={config} />
    </div>
    <Display title={'Output'} data={build(queries, config)} />
  </div>
);

export = App;
