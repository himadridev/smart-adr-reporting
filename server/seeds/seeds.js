/**
 * Created by himadri on 3/19/16.
 */

Meteor.startup(function() {
  var tmpProdIds = [];
  var medicinesCollectionCount = Medicines.find().count();
  var tweetSentimentCollectionCount = TweetSentiment.find().count();
  if (medicinesCollectionCount === 0) {
    console.log("Inserting...");
    var products = [{
      "drugName": "Tylenol",
      "genericName": "acetaminophen",
      "compositions": "acetaminophen",
      "manufacturerName": "Jhonson and Jhonson",
      "manufacturerEmail": "jhonson@jhonson.com",
      "manufacturerMobile": "9916128345",
      "manufacturerAdderss": "acetaminophen makers",
      "keywords": [
        "acetaminophen",
        "tylenol"
      ],
      "feedback": {
        "positive": 0,
        "negative": 0
      }
    }, {
      drugName: "ALPHA D3",
      compositions: "Alphacalcidol",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['ALPHAD3'],
      hasNotification: false
    }, {
      drugName: "Benitec",
      compositions: "Olmesartan medoxomil",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Benitec'],
      hasNotification: false
    }, {
      drugName: "Dilo-BM Expectorant",
      compositions: "Ambroxol Hydrochloride, Guaiphenesin, Terbutaline Sulphate",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Dilo-BM', 'Expectorant', 'Dilo-BM Expectorant'],
      hasNotification: false
    }, {
      drugName: "Eltroxin",
      compositions: "Thyroxine Sodium",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Eltroxin'],
      hasNotification: false
    }, {
      drugName: "Flutibact",
      compositions: "Fluticasone Propionate, Mupirocin",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Flutibact', 'Mupirocin'],
      hasNotification: false
    }, {
      drugName: "Kemadrin",
      compositions: "Procyclidine Hydrochloride",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Kemadrin'],
      hasNotification: false
    }, {
      drugName: "Phexin BD",
      compositions: "Cephalexin extended-release",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Phexin', 'Phexin BD'],
      hasNotification: false
    }, {
      drugName: "Piriton CS",
      compositions: "Chlorpheniramine Maleate, Dextromethorphan Hydrobromide",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Piriton CS', 'Piriton', 'PiritonCS'],
      hasNotification: false
    }, {
      drugName: "Tenovate Maleate",
      compositions: "Clobetasol Propionate, Miconazole Nitrate",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Tenovate Maleate', 'TenovateMaleate', 'Tenovate', 'Maleate'],
      hasNotification: false
    }, {
      drugName: "Zemetril",
      compositions: "Cefprozil Monohydrate",
      manufacturerName: "GSK Pharma",
      manufacturerEmail: "askus@gsk.com",
      manufacturerMobile: "+91 22 24959595",
      manufacturerAddress: "Dr. Annie Besant Road, Mumbai - 400 030",
      feedback: {
        "positive": 0,
        "negative": 0
      },
      keywords: ['Zemetril'],
      hasNotification: false
    }];
    for (var i = 0; i < products.length; i++) {
      products[i].shortid = ShortId.generate();
      tmpProdIds.push(products[i].shortid);
      Medicines.insert(products[i]);
    }
  }

  if (tweetSentimentCollectionCount === 0) {
    var twitterStatements = [{
      "txtId": "711253385652137984",
      "text": "@OnModulus @Telerik Unfortunately I didn't get to the conf :disappointed: Any chance of a code to give it a whirl with @meteorjs?!",
      "userName": "David Bower",
      "feedbackFormSent": true,
      "sentiment": "negative",
      "reportAt": "Sat Mar 19 18:09:56 +0000 2016",
      "location": null,
      shortid: tmpProdIds[1]
    }, {
      "txtId": "71125338565345984",
      "text": "@OnModulus @Telerik Unfortunately I didn't get to the conf :disappointed: Any chance of a code to give it a whirl with @meteorjs?!",
      "userName": "Jagz viruz",
      "feedbackFormSent": true,
      "sentiment": "negative",
      "reportAt": "Sat Mar 19 18:09:56 +0000 2016",
      "location": null,
      shortid: tmpProdIds[1]
    }, {
      "txtId": "71125338565345984",
      "text": "Enjoying at MyLan",
      "userName": "Himadri",
      "feedbackFormSent": true,
      "sentiment": "positive",
      "reportAt": "Sat Mar 19 18:09:56 +0000 2016",
      "location": null,
      shortid: tmpProdIds[1]
    }];
    for (var j = 0; j < twitterStatements.length; j++) {
      TweetSentiment.insert(twitterStatements[j]);
    }
  }

  var smsReceivedCount = SMSReceived.find().count();

  if (!smsReceivedCount) {
    var smses = [{
      queryId: ShortId.generate(),
      shortid: tmpProdIds[0],
      from: '9916128366',
      feedbackReceived: false,
      seen: false,
      reportedAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
      queryId: ShortId.generate(),
      shortid: tmpProdIds[1],
      from: '9916128366',
      feedbackReceived: false,
      seen: false,
      reportedAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
      queryId: ShortId.generate(),
      shortid: tmpProdIds[0],
      from: '9916128366',
      feedbackReceived: false,
      seen: false,
      reportedAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }, {
      queryId: ShortId.generate(),
      shortid: tmpProdIds[0],
      from: '9916128366',
      feedbackReceived: false,
      seen: false,
      reportedAt: moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
    }];

    for (var i = 0; i < smses.length; i++) {
      SMSReceived.insert(smses[i]);
    }
  }

  console.log("Medicine Count - " + Medicines.find().count());
  console.log("Twitter Statement Count - " + TweetSentiment.find().count());
  console.log("SMSReceived Count - " + SMSReceived.find().count());
});