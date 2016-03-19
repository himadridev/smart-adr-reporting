/**
 * Created by himadri on 3/19/16.
 */

Router.configure({
  layoutTemplate: 'SimpleLayout'
});

Router.route('Home', {
  path: '/'
});

Router.route('Inspector', {
  path: '/inspector'
});

Router.route('NewMedicine', {
  path: '/add/medicine'
});

Router.route('UserFeedback', {
  path: '/feedback'
});

Router.route('/incomingsms',{ where: 'server' }).post(function(){
  var request = this.request;

  console.log(request);

  this.response.end('OK');
});