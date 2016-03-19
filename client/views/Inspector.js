/**
 * Created by himadri on 3/19/16.
 */

Template.Inspector.created = function () {
  var template = this;
  template.hasUnattendedFeedback = new ReactiveVar(false);
  template.DataContainer = new ReactiveDict();

  Meteor.call('checkForUnattendedFeedback', function(resp){
    template.hasUnattendedFeedback = resp;
  });
};

Template.Inspector.rendered = function () {

};


Template.Inspector.helpers({
  hasUnattendedFeedback: function(){
    return Template.instance().hasUnattendedFeedback;
  },
  getItems: function() {
    return [
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]},
      {name : "Some Name", manufacture : "Some Name", tags : ["#tag1", "#tag2", "tag3"]}
    ]
  }
});

Template.Inspector.events({
  'click .js-add-item' : function(event, template) {
    $('#addNewInspection').modal('show');
  }
});

Template.Inspector.destroyed = function () {

};