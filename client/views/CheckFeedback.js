Template.CheckFeedback.created = function () {
  var tmpl = this;

  tmpl.unattended = new ReactiveDict();

  Meteor.call('getUnattendedFeedback', function(err, data){
    
    tmpl.unattended.set('data', data);
  });

};

Template.Inspector.rendered = function () {
  var template = this;
};


Template.CheckFeedback.helpers({
  unattendedCount: function () {
    return Template.instance().unattended.get('data') ? Template.instance().unattended.get('data').length : 0;
  },

  unattended: function(){
    return Template.instance().unattended.get('data') ;
  }
});