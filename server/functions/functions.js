Fiber = Npm.require('fibers');
T = new Twit({
      consumer_key: Meteor.settings.twitterConsumerKey,
      consumer_secret: Meteor.settings.twitterConsumerSecret,
      access_token: Meteor.settings.twitterAccessToken,
      access_token_secret: Meteor.settings.twitterAccessTokenSecret
    });

Utils = {

  storeTweetIfUnique: function(err, data, response, keyword) {
    var i, numTweets, tmp, tweetId, tweetCount, resp;
    var statuses = data.statuses;
    var url =Meteor.settings.serverUrl + 'scale/' + keyword ; 
    numTweets = statuses.length;
  
    for (i = 0; i < numTweets; i++) {
        
      tweetId = statuses[i].id_str;
      tweetCount = TweetSentiment.find({
          txtId: tweetId
        }).count() ;
      

      if ( !tweetCount ) {
        tmp = {};
        tmp.txtId = tweetId;
        tmp.text = statuses[i].text;
        tmp.userid = statuses[i].user.name;
        tmp.feedbackFormSent = false;
        tmp.sentiment = Meteor.call('fetchTextSentiment', statuses[i].text);
        tmp.reportAt = statuses[i].created_at;

        if (statuses[i].user.geo_enabled){
          tmp.location = statuses[i].geo;
        }

        if(tmp.sentiment === 'negative'){
          Meteor.call('sendFormViaTweetToUser', statuses[i].user.screen_name, keyword, url)
          tmp.feedbackFormSent = true;
        }
        console.log(tmp)      ;
        TweetSentiment.insert(tmp);
      }
    }
  }
}