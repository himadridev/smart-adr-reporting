Fiber = Npm.require('fibers');

Utils = {
  
  storeTweetIfUnique: function(err, data, response) {
    var i, numTweets, tmp, tweetId, tweetCount, resp;
    var statuses = data.statuses;
    numTweets = statuses.length;
    for (i = 0; i < numTweets; i++) {
      console.log(statuses[i]);
      tweetId = statuses[i].id_str;
      tweetCount = TweetSentiment.find({
          txtId: tweetId
        }).count() ;
      

      if ( !tweetCount ) {
        tmp = {};
        tmp.txtId = tweetId;
        tmp.text = statuses[i].text;

        // tmp.sentiment = Meteor.call('fetchTextSentiment', statuses[i].text);
        
        TweetSentiment.insert(tmp);

        // if(tmp.sentiment){

        // }
        
      }
    }
  }
}