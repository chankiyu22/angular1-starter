angular.module('app')
.constant('config', {
  'ENVIRONMENT': process.env.NODE_ENV,
  'API_URL': 'http://dev.example.com',
});
