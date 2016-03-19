Meteor.methods({
  fetchTweetsFromTwitter: function(keyword) {
    var T = new Twit({
      consumer_key: Meteor.settings.twitterConsumerKey,
      consumer_secret: Meteor.settings.twitterConsumerSecret,
      access_token: Meteor.settings.twitterAccessToken,
      access_token_secret: Meteor.settings.twitterAccessTokenSecret
    });

    T.get('search/tweets', {
      q: keyword,
      count: 5
    }, Meteor.bindEnvironment(Utils.storeTweetIfUnique));
  },

  fetchTextSentiment: function(txt) {
    var alchemyURL = Meteor.settings.alchemyUrl;
    var postData = {
      'apikey': '560e4a4c8b48b771bcedfd2d0e8718557aed0b46',
      'text': txt,
      'outputMode': 'json'
    };
    var options = {
      params: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    var sentimentData = HTTP.call('POST', alchemyURL, options)
      
    
    return sentimentData.data.docSentiment.type;
  }
})