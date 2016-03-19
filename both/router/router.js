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
    queryId: ShortId.generate(),
    shortid: prodcode,
    from: fromNumber,
    feedbackReceived: false,
    reportedAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  })

  this.response.end('OK');
});

Router.route('ReactionScale', {
  path: '/scale/:drugName?/:txtId?',
  data: function () {
    var medicine = Medicines.findOne({drugName: this.params.drugName});
    var twitter = TweetSentiment.findOne({txtId: this.params.txtId});
    if(medicine && twitter){
      return {
        medicine: medicine,
        twitter: twitter
      }
    }
  },
  action: function(){
    this.render();
  }
});

Router.route('ProductDetail',{
  path: '/detail/:shortid'
});

Router.route('CheckFeedback',{
  path: '/checkfeedback'
});