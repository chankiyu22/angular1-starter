angular.module('app')
.constant('config', {
  'ENVIRONMENT': process.env.NODE_ENV,
  'API_URL': 'http://www.example.com',
});
