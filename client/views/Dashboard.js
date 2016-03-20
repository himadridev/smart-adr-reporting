/**
 * Created by himadri on 3/19/16.
 */

Template.Dashboard.created = function () {
  var template = this;
  template.hasUnattendedFeedback = new ReactiveVar(false);
  template.DataContainer = new ReactiveDict();
  
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
  }, 1000);
  template.DataContainer.set("intervalId", intervalId);
};

var checkForNewFeedBack = function(template){
  var newSMSCount = SMSReceived.find({seen : false}).count();
  if(newSMSCount === 0){
    template.DataContainer.set("newFeedbackCount", 0);
  } else {
    template.DataContainer.set("newFeedbackCount", (newSMSCount));
  }
};


Template.Dashboard.helpers({
  hasUnattendedFeedback: function(){
    return Template.instance().hasUnattendedFeedback;
  },
  getItems: function() {
    return Medicines.find().fetch();
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
  },
  'click .card' : function(event, template){
    var shortid = event.currentTarget.dataset.shortid;
    Router.go("ProductDetail", {shortid : shortid});
  }
});

Template.Dashboard.destroyed = function () {
  var template = this;
  var intervalId = template.DataContainer.get("intervalId");
  Meteor.clearInterval(intervalId);
};