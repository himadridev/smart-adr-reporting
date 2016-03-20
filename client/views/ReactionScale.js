/**
 * Created by himadri on 3/19/16.
 */

Template.ReactionScale.created = function () {
  var template = this;
  template.DataContainer = new ReactiveDict();
  template.DataContainer.set("doc", {});
  template.DataContainer.set("userName", false);
};

Template.ReactionScale.rendered = function () {

  var template = this;

  template.autorun(function(){
    if(Router.current && Router.current() && Router.current().data && Router.current().data()){
      var data = Router.current().data();
      var twitter = data['twitter'];
      var sms = data['sms'];
      var doc = {};
      template.$('.typeahead[name=drugName]').typeahead('val', data.medicine.drugName);
      doc['manufacturerName'] = data.medicine.manufacturerName;
      doc['shortid'] = data.medicine.shortid;

      if(twitter && twitter.txtId && twitter.userName){
        var userName = twitter.userName.trim();
        template.DataContainer.set("userName", userName);
        doc["userName"] = userName;
        doc["txtId"] = twitter.txtId;
      } else if(sms && sms.queryId) {
        doc["queryId"] = sms.queryId;
      }
      template.DataContainer.set("doc", doc);
    }
  });
};


Template.ReactionScale.helpers({
  doc: function(){
    return Template.instance().DataContainer.get("doc");
  },

  userName: function(){
    return Template.instance().DataContainer.get("userName");
  }
});

Template.ReactionScale.events({

});

Template.ReactionScale.destroyed = function () {

};


Template.ReactionScale.events({
  'click .js-edit': function(){
    $('.js-username-edit, .js-username').toggleClass('hidden');

    $('.js-editable-username').focus();
  },

  'blur .js-editable-username': function (event, template) {
    $('#drugReactionProbabilityForm input[name="userName"]').val($(event.target).val());
  }
});
var drugReactionProbabilityFormHook = {
  before: {
    method: function (doc) {
      return doc;
    }
  },

  onSuccess: function (formType, res) {
    if(res){
      Router.go("UserFeedback", {id : res.id});
    }
  },

  onError: function (formType, error) {

  }
};

AutoForm.addHooks('drugReactionProbabilityForm', drugReactionProbabilityFormHook);