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
  checkForUnattendedFeedback: function(){
    return SMSReceived.find({feedbackReceived: false}).count();
  },

  getUnattendedFeedback: function(shortid){
    if(shortid){
      return SMSReceived.find({shortid: shortid, feedbackReceived: false}).fetch();
    } else {
      return SMSReceived.find({feedbackReceived: false}).fetch();
    }
  },
  
  fetchTweetsFromTwitter: function(keywords) {
    var query = '';
    if (Array.isArray(keywords)){
      query = keywords.join(' OR ');
    } else {
      query = keywords;
    }
    T.get('search/tweets', {
      q: query,
      count: 30
    }, Meteor.bindEnvironment(function(err, data, response){
      Utils.storeTweetIfUnique(err, data, response, keywords)
    }));
  },
  
  sendFormViaTweetToUser: function(user, keyword, url){
    user = 'jagzviruz';
    T.post('statuses/update', 
           { 
            status: DEMO ? 'Hi @'+user +', we heard you had a problem with '+keyword+'? Why don\'t you tell us more about it ? ' + url : 'Hi @'+user +', how are u liking it ?'
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
      console.log(sentimentData);
    return sentimentData.data.docSentiment.type;
  },

  submitReactionDetails : function(doc) {
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

    doc['naranjoScore'] = naranjoScore;
    doc['naranjoStatus'] = naranjoStatus;

    var returnObj = {};
    returnObj['id'] = Feedback.insert(doc);
    returnObj['score'] = naranjoScore;

    return returnObj;
  },

  saveUserFeedback : function(doc){
    if(doc && doc.id){
      var id = doc.id;
      delete doc.id;
      return Feedback.update({_id : id}, {$set : doc});
    }

    var id = Feedback.insert(doc);
    if(id) {
      if(doc.queryId){
        SMSReceived.update({queryId : doc.queryId}, {$set : {seen : true, feedbackReceived: true}});
        return "SMS";
      }
      if(doc.txtId){
        TweetSentiment.update({txtId : doc.txtId}, {$set : {feedbackReceived: true}});
        return "TWITTER";
      }
    } else {
      return "SometingWrong";
    }


  },

  addNewMedicine: function(doc){
    var keywords = doc.keywords.split(",");
    var arr = [];
    for(var i = 0; i < keywords.length; i++){
      arr.push(keywords[i].trim());
    }
    doc.keywords = arr;
    var id = Medicines.insert(doc);
    if(id){
      return id;
    }
  }
});