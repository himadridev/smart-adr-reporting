Meteor.methods({
  fetchTweetsFromTwitter: function(keyword) {
    
    T.get('search/tweets', {
      q: keyword,
      count: 5
    }, Meteor.bindEnvironment(function(err, data, response){
      Utils.storeTweetIfUnique(err, data, response, keyword)
    }));
  },
  
  sendFormViaTweetToUser: function(user, keyword, url){
    user = 'jagzviruz';
    T.post('statuses/update', 
           { 
            status: Meteor.settings.demoReady ? 'Hi @'+user +', we heard you had a problem with '+keyword+'? Why don\'t you tell us more about it ? #mylanhacksummit' + url : 'Hi @'+user +', how are u liking it ?'
          }, function(err, data, response) {
      console.log('Message sent to ' + user);
    });
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