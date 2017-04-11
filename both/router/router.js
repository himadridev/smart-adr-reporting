/**
 * Created by himadri on 3/19/16.
 */

Router.configure({
  layoutTemplate: 'SimpleLayout'
});

Router.route('Home', {
  path: '/'
});

Router.route('Dashboard', {
  path: '/dashboard/:type'
});

Router.route('NewMedicine', {
  path: '/add/medicine'
});

Router.route('UserFeedback', {
  path: '/feedback/:id?'
});

Router.route('/incomingsms',{ where: 'server' }).post(function(){
  var request = this.request;
  var prodcode = request.body.Body.split(' ')[0] ;
  var fromNumber =  request.body.From ;
  
  SMSReceived.insert({
    queryId: ShortId.generate(),
    shortid: prodcode,
    from: fromNumber,
    feedbackReceived: false,
    seen : false,
    reportedAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
  })

  this.response.end('OK');
});

Router.route('ReactionScale', {
  path: '/reaction/details/:shortId',
  data: function () {
    var data = {};
    var query = this.params.query;
    data['medicine'] = Medicines.findOne({shortid: this.params.shortId});
    if(query && query.tId){
      var twitter = TweetSentiment.findOne({txtId: query.tId});
      if(twitter){
        data['twitter'] = twitter;
        return data;
      }
    } else if (query && query.sId) {
      var sms = SMSReceived.findOne({queryId: query.sId});
      if(sms){
        data['sms'] = sms;
        return data;
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

Router.route('ReTweetUser', {
  path: '/retweet/users',
  template: "UpdateReTweetUsers"
});