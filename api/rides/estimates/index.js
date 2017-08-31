const config = require('local/config');
const rp = require('request-promise');

module.exports = {
  get: (req, res, next) => {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const options = {
      uri: config.uber.uri.rides.estimates,
      qs: {
        start_latitude: lat,
        start_longitude: lng,
      },
      headers: {
        Authorization: `Token ${config.uber.token}`,
      },
    };

    return rp(options)
      .then(JSON.parse)
      .get('times')
      .call('find', product => product.product_id === config.uber.uberXId)
      .then(response => res.send(response))
      .nodeify(next);
  },
};
