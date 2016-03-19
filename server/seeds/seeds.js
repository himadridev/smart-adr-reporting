/**
 * Created by himadri on 3/19/16.
 */

Meteor.startup(function () {
  var medicinesCollectionCount = Medicines.find().count();
  var tweetSentimentCollectionCount = TweetSentiment.find().count();
  if(medicinesCollectionCount === 0) {
    console.log("Inserting...");
    var products = [
      {
        ApplNo: "087082",
        ProductNo: "001",
        drugName: "Esmolol Hydrochloride Injection",
        manufacturerName: "Baxter Healthcare S.A.",
        manufacturerAddress: "Moneen Road, Castlebar, County Mayo , Ireland (IRL)",
        feedback: {
          "positive" : 0,
          "negative" : 0
        },
        keywords: ['esmolol'],
        hasNotification : false
      },
      {
        ApplNo: "087082",
        ProductNo: "001",
        drugName: "Tylenol",
        manufacturerName: "Jhonson and Jhonson",
        manufacturerAddress: "New Brunswick, New Jersey",
        feedback: {
          "positive" : 0,
          "negative" : 0
        },
        keywords: ['tylenol','acetaminophen'],
        hasNotification : false
      }
    ];

    for(var i = 0; i < products.length; i++){
      products[i].shortid = ShortId.generate();
      Medicines.insert(products[i]);
    }
  }

  if(tweetSentimentCollectionCount === 0){
    var twitterStatements = [
      {
        "txtId" : "711253385652137984",
        "text" : "@OnModulus @Telerik Unfortunately I didn't get to the conf :disappointed: Any chance of a code to give it a whirl with @meteorjs?!",
        "userName" : "David Bower",
        "feedbackFormSent" : true,
        "sentiment" : "negative",
        "reportAt" : "Sat Mar 19 18:09:56 +0000 2016",
        "location" : null
      }
    ];
    for(var j = 0; j < twitterStatements.length; j++){
      TweetSentiment.insert(twitterStatements[j]);
    }
  }
  console.log("Medicine Count - "+Medicines.find().count());
  console.log("Twitter Statement Count - "+TweetSentiment.find().count());
});