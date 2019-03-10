export default {
  match: {
    bike_type: 'road',
    size: 54,
    release_date: '2016-06-03'
  },
  range: {
    ship_date: { lte: '2017-01-01', gte: '2016', format: 'dd-MM-yyyy||yyyy' }
  },
  enums: {
    frame: ['carbon', 'aluminum alloy'], // as an array
    colors: '(black OR gray) AND red', // using querystring syntax,
    brand: ['Gianz~', 'Cannon*', 'Spec^2'] // using fuzzy, wildcard, and boost symbols
  },
  multiField: [
    { fields: ['description, keywords'], value: 'skinny tires' },
    { fields: ['wheels', 'pedals'], value: 2 }
  ],
  filter: { match: { condition: 'brand_new' } },
  exclude: { range: { price: { lte: 600, gte: 1000 } } }
};
