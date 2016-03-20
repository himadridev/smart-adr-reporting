/**
 * Created by himadri on 3/19/16.
 */

Template.Inspector.created = function () {
  var template = this;
  template.hasUnattendedFeedback = new ReactiveVar(false);
  template.DataContainer = new ReactiveDict();
  template.DataContainer.set("newFeedback", false);
  template.DataContainer.set("newFeedbackCount", 0);
  template.DataContainer.set("intervalId", "");

  Meteor.call('checkForUnattendedFeedback', function(resp){
    template.hasUnattendedFeedback = resp;
  });
};

Template.Inspector.rendered = function () {
  var template = this;
  checkForNewFeedBack(template);
  var intervalId = Meteor.setInterval(function() {
    checkForNewFeedBack(template);
  }, 15000);
  template.DataContainer.set("intervalId", intervalId);
};

var checkForNewFeedBack = function(template){
  var newTwitterCount = TweetSentiment.find({seen : false}).count();
  var newSMSCount = SMSReceived.find({seen : false}).count();
  if(newTwitterCount + newSMSCount === 0){
    template.DataContainer.set("newFeedback", false);
    template.DataContainer.set("newFeedbackCount", 0);
  } else {
    template.DataContainer.set("newFeedback", true);
    template.DataContainer.set("newFeedbackCount", (newTwitterCount + newSMSCount));
  }
};


Template.Inspector.helpers({
  hasUnattendedFeedback: function(){
    return Template.instance().hasUnattendedFeedback;
  },
  getItems: function() {
    return Medicines.find().fetch();
  },
  newFeedback: function() {
    return Template.instance().DataContainer.get("newFeedback");
  },
  newFeedbackCount: function() {
    return Template.instance().DataContainer.get("newFeedbackCount");
  }
});

Template.Inspector.events({
  'click .js-add-item' : function(event, template) {
    $('#addNewInspection').modal('show');
  }
});

Template.Inspector.destroyed = function () {
  var template = this;
  var intervalId = template.DataContainer.get("intervalId");
  Meteor.clearInterval(intervalId);
};