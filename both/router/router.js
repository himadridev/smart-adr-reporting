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
  var prodcode = request.body.Body ;
  var fromNumber =  request.body.From ;
  
  SMSReceived.insert({
    shortid: prodcode,
    from: fromNumber,
    feedbackReceived: false
  })

  this.response.end('OK');
});

Router.route('ReactionScale', {
  path: '/scale/:drugName?',
  data: function () {
    return Medicines.findOne({drugName: this.params.drugName});
  }
});