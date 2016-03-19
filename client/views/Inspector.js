/**
 * Created by himadri on 3/19/16.
 */

Template.Inspector.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
};

Template.Inspector.rendered = function () {

};


Template.Inspector.helpers({
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