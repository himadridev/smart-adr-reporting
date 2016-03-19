var PROBABILITY_SCORE_MAPPING = {
  Qus1 : { YES : 1, NO : 0, NA : 0},
  Qus2 : { YES : 2, NO : -1, NA : 0},
  Qus3 : { YES : 1, NO : 0, NA : 0},
  Qus4 : { YES : 2, NO : -1, NA : 0},
  Qus5 : { YES : -1, NO : +2, NA : 0},
  Qus6 : { YES : -1, NO : 1, NA : 0},
  Qus7 : { YES : 1, NO : 0, NA : 0},
  Qus8 : { YES : 1, NO : 0, NA : 0},
  Qus9 : { YES : 1, NO : 0, NA : 0},
  Qus10 : { YES : 1, NO : 0, NA : 0}
};


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
    var sentimentData = HTTP.call('POST', alchemyURL, options);
      
    
    return sentimentData.data.docSentiment.type;
  },

  'submitReactionDetails' : function(doc) {
    var naranjoStatus,
      naranjoScore = 0;
    for(var i = 1; i <= 10; i++) {
      var qus           = "Qus"+i;
      var userResponse  = doc[qus];
      var score         = userResponse ? PROBABILITY_SCORE_MAPPING[qus][userResponse] : PROBABILITY_SCORE_MAPPING[qus]["NA"];
      naranjoScore = naranjoScore + score;
    }
    if(naranjoScore >= 9){
      naranjoStatus = "Definite ADR";
    } else if(naranjoScore >= 5 && naranjoScore <= 8) {
      naranjoStatus = "Probable ADR";
    } else if(naranjoScore >= 1 && naranjoScore <= 4) {
      naranjoStatus = "Possible ADR";
    } else {
      naranjoStatus = "Doubtful ADR";
    }

    return "Done"
  }
});

