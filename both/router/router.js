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