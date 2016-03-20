Fiber = Npm.require('fibers');
T = new Twit({
  consumer_key: Meteor.settings.twitterConsumerKey,
  consumer_secret: Meteor.settings.twitterConsumerSecret,
  access_token: Meteor.settings.twitterAccessToken,
  access_token_secret: Meteor.settings.twitterAccessTokenSecret
});
DEMO = Meteor.settings.demoReady;

Utils = {

  storeTweetIfUnique: function(err, data, response, keyword) {
    var i, numTweets, tmp, tweetId, tweetCount, resp;
    var statuses = data.statuses;
    var url = Meteor.settings.serverUrl + 'reaction/details/';
    var pos = 0;
    var neg = 0;
    var shortid;
    var rec ;
    numTweets = statuses.length;

    if (!Array.isArray(keyword)) {
      keyword = [keyword];
    }

    rec = Medicines.findOne({
      'keywords': {
        $all: keyword
      }
    });
    shortid = rec.shortid;
    neg = rec.feedback.negative;
    pos = rec.feedback.positive;

    for (i = 0; i < numTweets && !statuses[i].retweeted; i++) {

      tweetId = statuses[i].id_str;
      tweetCount = TweetSentiment.find({
        txtId: tweetId
      }).count();

      if (!tweetCount) {
        tmp = {};
        tmp.txtId = tweetId;
        tmp.text = statuses[i].text;
        tmp.userName = statuses[i].user.name;
        tmp.feedbackFormSent = false;
        tmp.sentiment = DEMO ? Meteor.call('fetchTextSentiment', statuses[i].text) : 'negative';
        tmp.reportAt = statuses[i].created_at;
        tmp.feedbackFor = keyword;
        tmp.seen = false;

        if (statuses[i].user.geo_enabled) {
          tmp.location = statuses[i].geo;
        }

        if (tmp.sentiment === 'negative') {
          if (DEMO) {
            Meteor.call('sendFormViaTweetToUser', statuses[i].user.screen_name, keyword, url + shortid + '?tId=' + tweetId);
          }
          tmp.feedbackFormSent = true;
          neg++;
        } else if (tmp.sentiment === 'positive') {
          pos++;
        }

        TweetSentiment.insert(tmp);
      } else {
        TweetSentiment.update({
          txtId: tweetId
        }, {
          feedbackFor: {
            $push: keyword
          }
        })
      }
    }

    Medicines.update({shortid : shortid}, {$set: {
      'feedback.negative' : neg,
      'feedback.positive' : pos
    }});

  }
};