Template.CheckFeedback.created = function () {
  var tmpl = this;

  tmpl.unattended = new ReactiveDict();

  Meteor.call('getUnattendedFeedback', function(err, data){
    
    tmpl.unattended.set('data', data);
  });

};


Template.CheckFeedback.helpers({
  unattendedCount: function () {
    return Template.instance().unattended.get('data') ? Template.instance().unattended.get('data').length : 0;
  },

  unattended: function(){
    return Template.instance().unattended.get('data') ;
  }
});