export default {
  match: {
    bike_type: 'road',
    size: 54,
    release_date: '2016-06-03', // use string date format
    post_date: new Date('2016-07-01'), // or JS Date object
    '(condition)': 'brand new' // disregard relevancy scoring
  },
  range: {
    ship_date: { lte: '2017-01-01', gte: '2016-07-05' },
    '!price': { lte: 600, gte: 1000 } // exclude from results
  },
  enums: {
    frame: ['carbon', 'aluminum alloy'], // as an array
    colors: '(black OR gray) AND red', // using querystring syntax,
    brand: ['Gianz~', 'Cannon*', 'Spec^2'] // use wildcard symbols
  },
  multiField: {
    'skinny tires': ['description', 'keywords'],
    2: ['wheels', 'pedals']
  }
};
