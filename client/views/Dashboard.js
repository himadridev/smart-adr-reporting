/**
 * Created by himadri on 3/19/16.
 */

Template.Dashboard.created = function () {
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

Template.Dashboard.rendered = function () {
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


Template.Dashboard.helpers({
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
  },
  headerText: function() {
    var type = Router.current().params.type;
    return type === "inspector" ? "Inspector Dashboard" : "Manufacturer Dashboard";
  },
  userType: function() {
    return Router.current().params.type;
  }
});

Template.Dashboard.events({
  'click .js-add-item' : function(event, template) {
    $('#addNewInspection').modal('show');
  }
});

Template.Dashboard.destroyed = function () {
  var template = this;
  var intervalId = template.DataContainer.get("intervalId");
  Meteor.clearInterval(intervalId);
};